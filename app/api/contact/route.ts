import { db } from "@/lib/db/db";
import { leads } from "@/lib/db/schema";
import { updateLeadNotificationStatus } from "@/lib/db/recovery";
import { Resend } from "resend";
import { escapeHtml, sanitizeNotificationError } from "@/lib/security/sanitize";
import { createSuccessResponse, createErrorResponse } from "@/lib/security/response";
import { checkRateLimit } from "@/lib/security/ratelimit";
import { contactSchema } from "@/lib/validation/contact";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import * as Sentry from "@sentry/nextjs";

const MAX_BODY_SIZE = 64 * 1024; // 64 KB

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  try {
    // 1. Content-Type Check
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      logAudit(requestId, "/api/contact", 415, startTime, "UNSUPPORTED_MEDIA");
      return createErrorResponse(
        "UNSUPPORTED_MEDIA",
        "Content-Type must be application/json",
        requestId,
        415
      );
    }

    // 2. Fast Content-Length Check
    const contentLength = parseInt(
      request.headers.get("content-length") || "0",
      10
    );
    if (contentLength > MAX_BODY_SIZE) {
      logAudit(requestId, "/api/contact", 413, startTime, "PAYLOAD_TOO_LARGE");
      return createErrorResponse(
        "PAYLOAD_TOO_LARGE",
        "Payload exceeds 64KB size limit",
        requestId,
        413
      );
    }

    // 3. Read raw text and enforce actual byte length
    let rawText = "";
    try {
      rawText = await request.text();
    } catch {
      logAudit(requestId, "/api/contact", 400, startTime, "INVALID_INPUT");
      return createErrorResponse(
        "INVALID_INPUT",
        "Failed to read request body",
        requestId,
        400
      );
    }

    const byteLength = new TextEncoder().encode(rawText).length;
    if (byteLength > MAX_BODY_SIZE) {
      logAudit(requestId, "/api/contact", 413, startTime, "PAYLOAD_TOO_LARGE");
      return createErrorResponse(
        "PAYLOAD_TOO_LARGE",
        "Payload exceeds 64KB size limit",
        requestId,
        413
      );
    }

    // 4. Safely parse JSON
    let body: any;
    try {
      body = JSON.parse(rawText);
    } catch {
      logAudit(requestId, "/api/contact", 400, startTime, "INVALID_INPUT");
      return createErrorResponse(
        "INVALID_INPUT",
        "Invalid JSON body format",
        requestId,
        400
      );
    }

    // 5. Honeypot check (Silent success response)
    if (body?.honeypot && typeof body.honeypot === "string" && body.honeypot.trim() !== "") {
      logAudit(requestId, "/api/contact", 200, startTime, "HONEYPOT_TRIGGERED");
      return createSuccessResponse({ processed: true, accepted: false }, requestId, 200);
    }

    // 6. Distributed Rate Limiting (Upstash Redis sliding window)
    const rateLimit = await checkRateLimit(request, "contact");
    if (!rateLimit.success) {
      logAudit(requestId, "/api/contact", 429, startTime, "RATE_LIMITED");
      return createErrorResponse(
        "RATE_LIMITED",
        "Too many requests. Please try again later.",
        requestId,
        429,
        { "Retry-After": String(rateLimit.resetSeconds) }
      );
    }

    // 7. Zod Schema Validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      logAudit(requestId, "/api/contact", 400, startTime, "INVALID_INPUT");
      return createErrorResponse(
        "INVALID_INPUT",
        "Check the highlighted details and try again.",
        requestId,
        400,
        undefined,
        result.error.flatten().fieldErrors
      );
    }

    const {
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      preferredContactMethod,
      message,
    } = result.data;

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();
    const idempotencyKey = result.data.idempotencyKey?.trim() || crypto.randomUUID();

    // 8. Atomic Lead Acceptance Boundary (PostgreSQL ON CONFLICT DO NOTHING)
    let leadId = "lead_" + crypto.randomUUID();
    let isConflict = false;

    try {
      const insertQuery = db.insert(leads).values({
        leadId,
        idempotencyKey,
        name: name.trim(),
        email: normalizedEmail,
        company: company?.trim() || null,
        projectType: projectType.trim(),
        budget: budget?.trim() || null,
        timeline: timeline?.trim() || null,
        preferredContactMethod: preferredContactMethod?.trim() || null,
        message: trimmedMessage,
        status: "accepted",
        notificationStatus: "pending",
        notificationAttempts: 0,
      });

      let insertedRows: any[] = [];
      if (typeof (insertQuery as any).onConflictDoNothing === "function") {
        const conflictQuery = (insertQuery as any).onConflictDoNothing({ target: leads.idempotencyKey });
        if (typeof conflictQuery.returning === "function") {
          insertedRows = await conflictQuery.returning({ id: leads.id, leadId: leads.leadId });
        } else {
          await conflictQuery;
          insertedRows = [{ id: 1, leadId }];
        }
      } else if (typeof (insertQuery as any).returning === "function") {
        insertedRows = await (insertQuery as any).returning({ id: leads.id, leadId: leads.leadId });
      } else {
        await insertQuery;
        insertedRows = [{ id: 1, leadId }];
      }

      if (insertedRows && insertedRows.length > 0) {
        if (insertedRows[0]?.leadId) {
          leadId = insertedRows[0].leadId;
        }
      } else {
        // Conflict on idempotency_key: retrieve existing lead ID
        const existing = await db
          .select({ id: leads.id, leadId: leads.leadId })
          .from(leads)
          .where(eq(leads.idempotencyKey, idempotencyKey))
          .limit(1);

        if (existing && existing.length > 0 && existing[0]?.leadId) {
          leadId = existing[0].leadId;
        }
        isConflict = true;
      }
    } catch (dbError) {
      logAudit(requestId, "/api/contact", 503, startTime, "STORAGE_FAILURE");
      Sentry.captureException(dbError, {
        tags: { route: "/api/contact", stage: "durable_acceptance" },
        extra: { requestId },
      });
      console.error(`🚨 [ALERT] Lead storage failed. RequestID: ${requestId}`);
      return createErrorResponse(
        "SERVICE_UNAVAILABLE",
        "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route.",
        requestId,
        503
      );
    }

    // 9. On Conflict: Return 200 { accepted: true, leadId } and NO second email
    if (isConflict) {
      logAudit(requestId, "/api/contact", 200, startTime, "DUPLICATE_IDEMPOTENT", leadId);
      return createSuccessResponse(
        {
          message: "We received your request.",
          leadId,
          accepted: true,
          duplicate: true,
          acknowledgementSent: false,
        },
        requestId,
        200
      );
    }

    // 10. Post-Commit Operator Notification (isolated from acceptance boundary)
    let acknowledgementSent = false;
    let notificationStatus: "pending" | "sent" | "failed" = "pending";

    try {
      const resendApiKey = process.env.RESEND_API_KEY || "";

      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const fromEmail = resendApiKey.startsWith("re_")
          ? "YCN Labs <leads@ycnlabs.com>"
          : "onboarding@resend.dev";
        const adminDestEmail =
          process.env.LEAD_DESTINATION_EMAIL || "hello@ycnlabs.com";

        const safeName = escapeHtml(name);
        const safeCompany = escapeHtml(company || "N/A");

        try {
          const ownerResult = await resend.emails.send({
            from: fromEmail,
            to: adminDestEmail,
            subject: `New Lead: ${safeName} (${safeCompany}) [${leadId}]`,
            text: `Lead ID: ${leadId}\nName: ${name}\nEmail: ${normalizedEmail}\nCompany: ${
              company || "N/A"
            }\nPreferred Contact: ${preferredContactMethod || "Email"}\nProject Type: ${projectType}\nBudget: ${
              budget || "Not specified"
            }\nTimeline: ${timeline || "Not specified"}\n\nMessage:\n${trimmedMessage}`,
          });

          // Explicitly check Resend's returned error property
          if (ownerResult.error) {
            notificationStatus = "failed";
            const safeCategory = sanitizeNotificationError(ownerResult.error.message);
            try {
              await updateLeadNotificationStatus(leadId, "failed", safeCategory);
            } catch (statusErr) {
              console.error("Failed to update notification status", statusErr);
            }
            Sentry.captureException(new Error(`Resend notification failure: ${safeCategory}`), {
              tags: { route: "/api/contact", stage: "owner_notification", category: safeCategory },
              extra: { requestId, leadId },
            });
            console.error(
              `🚨 [ALERT] Lead ${leadId} persisted but OWNER notification returned error (${safeCategory}). RequestID: ${requestId}`
            );
          } else {
            notificationStatus = "sent";
            try {
              await updateLeadNotificationStatus(leadId, "sent");
            } catch (statusErr) {
              console.error("Failed to update notification status", statusErr);
            }
          }
        } catch (ownerEmailError: any) {
          notificationStatus = "failed";
          const safeCategory = sanitizeNotificationError(ownerEmailError);
          try {
            await updateLeadNotificationStatus(leadId, "failed", safeCategory);
          } catch (statusErr) {
            console.error("Failed to update notification status", statusErr);
          }
          Sentry.captureException(new Error(`Resend notification exception: ${safeCategory}`), {
            tags: { route: "/api/contact", stage: "owner_notification", category: safeCategory },
            extra: { requestId, leadId },
          });
          console.error(
            `🚨 [ALERT] Lead ${leadId} persisted but OWNER notification threw error (${safeCategory}). RequestID: ${requestId}`
          );
        }

        // Optional visitor acknowledgement
        try {
          const ackResult = await resend.emails.send({
            from: fromEmail,
            to: normalizedEmail,
            subject: "Project inquiry received — YCN Labs",
            text: `Hi ${name},\n\nThank you for reaching out to YCN Labs. We have received your inquiry.\n\nBest regards,\nThe YCN Labs Team`,
          });

          if (!ackResult.error) {
            acknowledgementSent = true;
          }
        } catch {
          // Acknowledgement error is non-fatal
        }
      }
    } catch (postCommitError) {
      Sentry.captureException(postCommitError, {
        tags: { route: "/api/contact", stage: "post_commit_operations" },
        extra: { requestId, leadId },
      });
      console.error(`🚨 [ALERT] Post-commit error for lead ${leadId}. RequestID: ${requestId}`, postCommitError);
    }

    logAudit(requestId, "/api/contact", 200, startTime, undefined, leadId, notificationStatus);
    return createSuccessResponse(
      {
        message: "We received your request.",
        leadId,
        accepted: true,
        acknowledgementSent,
      },
      requestId,
      200
    );
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: "/api/contact", stage: "route_exception" },
      extra: { requestId },
    });
    console.error(`❌ [ERROR] Contact API route exception. RequestID: ${requestId}`);
    logAudit(requestId, "/api/contact", 503, startTime, "SERVICE_UNAVAILABLE");
    return createErrorResponse(
      "SERVICE_UNAVAILABLE",
      "We could not accept your request safely. Your message has not been confirmed—please try again or use the listed contact route.",
      requestId,
      503
    );
  }
}

function logAudit(
  requestId: string,
  route: string,
  status: number,
  startTime: number,
  errorCategory?: string,
  leadId?: string,
  notificationStatus?: string
) {
  const durationMs = Date.now() - startTime;
  console.log(
    JSON.stringify({
      requestId,
      route,
      status,
      durationMs,
      ...(leadId ? { leadId } : {}),
      ...(notificationStatus ? { notificationStatus } : {}),
      ...(errorCategory ? { errorCategory } : {}),
    })
  );
}
