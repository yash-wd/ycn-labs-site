import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  LEAD_DESTINATION_EMAIL: z.string().email().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  RATE_LIMIT_HASH_SECRET: z
    .string()
    .min(16, "RATE_LIMIT_HASH_SECRET must be at least 16 characters")
    .optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid server environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid server environment variables.");
  }

  const env = parsed.data;
  const isProductionBuild =
    process.env.NEXT_PHASE === "phase-production-build";

  if (env.NODE_ENV === "production" && !isProductionBuild) {
    const missing: string[] = [];
    if (!env.DATABASE_URL) missing.push("DATABASE_URL");
    if (!env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
    if (!env.LEAD_DESTINATION_EMAIL) missing.push("LEAD_DESTINATION_EMAIL");
    if (!env.UPSTASH_REDIS_REST_URL) missing.push("UPSTASH_REDIS_REST_URL");
    if (!env.UPSTASH_REDIS_REST_TOKEN) missing.push("UPSTASH_REDIS_REST_TOKEN");
    if (!env.RATE_LIMIT_HASH_SECRET) missing.push("RATE_LIMIT_HASH_SECRET");

    if (missing.length > 0) {
      const msg = `❌ Production deployment missing required environment variables: ${missing.join(
        ", "
      )}`;
      console.error(msg);
      throw new Error(msg);
    }
  }

  cachedEnv = env;
  return env;
}
