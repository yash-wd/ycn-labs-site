import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import crypto from "crypto";
import { getServerEnv } from "@/lib/env/server";
import { isStaging } from "@/lib/env/staging";

let contactRatelimit: Ratelimit | null = null;
let newsletterRatelimit: Ratelimit | null = null;
let redisClient: Redis | null = null;
let warnedMissingRedis = false;

function getNamespacePrefix(): string {
  return isStaging() ? "staging" : "prod";
}

export function getUpstashRedis(): { redis: Redis | null; isConfigured: boolean } {
  const env = getServerEnv();

  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    if (!warnedMissingRedis && env.NODE_ENV !== "production") {
      console.warn(
        "⚠️ [SECURITY WARN] Upstash Redis credentials missing. Distributed rate limiting and deduplication bypassed in local development."
      );
      warnedMissingRedis = true;
    }
    return { redis: null, isConfigured: false };
  }

  if (!redisClient) {
    redisClient = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return { redis: redisClient, isConfigured: true };
}

function getRatelimiter(type: "contact" | "newsletter"): Ratelimit | null {
  const { redis, isConfigured } = getUpstashRedis();
  if (!isConfigured || !redis) return null;

  const ns = getNamespacePrefix();
  if (type === "contact") {
    if (!contactRatelimit) {
      contactRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 h"),
        analytics: true,
        prefix: `ratelimit:${ns}:contact`,
      });
    }
    return contactRatelimit;
  } else {
    if (!newsletterRatelimit) {
      newsletterRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, "1 h"),
        analytics: true,
        prefix: `ratelimit:${ns}:newsletter`,
      });
    }
    return newsletterRatelimit;
  }
}

export function getRateLimitSecret(): string {
  const env = getServerEnv();
  if (env.RATE_LIMIT_HASH_SECRET) {
    return env.RATE_LIMIT_HASH_SECRET;
  }
  if (env.NODE_ENV === "production") {
    throw new Error(
      "RATE_LIMIT_HASH_SECRET is required in production environment."
    );
  }
  // Deterministic safe fallback for development and isolated unit tests
  return "ycn-labs-dev-test-only-deterministic-hmac-secret-min32ch";
}

export function hashClientIp(request: Request, secretOverride?: string): string {
  const rawIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const secret = secretOverride || getRateLimitSecret();
  return crypto.createHmac("sha256", secret).update(rawIp).digest("hex");
}

export async function checkRateLimit(
  request: Request,
  type: "contact" | "newsletter"
): Promise<{ success: boolean; limit: number; remaining: number; resetSeconds: number }> {
  const limiter = getRatelimiter(type);
  if (!limiter) {
    return { success: true, limit: 10, remaining: 10, resetSeconds: 0 };
  }

  const hashedIp = hashClientIp(request);
  const result = await limiter.limit(hashedIp);

  const resetSeconds = Math.ceil(Math.max(0, result.reset - Date.now()) / 1000);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    resetSeconds,
  };
}

function getDedupeKey(prefix: string, fingerprintInput: string): string {
  const ns = getNamespacePrefix();
  const hash = crypto.createHash("sha256").update(fingerprintInput).digest("hex");
  return `dedupe:${ns}:${prefix}:${hash}`;
}

/**
 * Checks if a submission with this fingerprint has already been processed within the window.
 * Read-only check: does NOT hold or reserve the key yet.
 */
export async function isDuplicateSubmission(
  prefix: string,
  fingerprintInput: string
): Promise<boolean> {
  const { redis, isConfigured } = getUpstashRedis();
  if (!isConfigured || !redis) return false;

  const key = getDedupeKey(prefix, fingerprintInput);
  const exists = await redis.get(key);
  return exists !== null;
}

/**
 * Reserves the deduplication key AFTER successful persistence to prevent duplicate reprocessing.
 */
export async function reserveDuplicateKey(
  prefix: string,
  fingerprintInput: string
): Promise<void> {
  const { redis, isConfigured } = getUpstashRedis();
  if (!isConfigured || !redis) return;

  const key = getDedupeKey(prefix, fingerprintInput);
  await redis.set(key, "1", { ex: 600 });
}
