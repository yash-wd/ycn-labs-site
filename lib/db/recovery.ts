import { db } from "./db";
import { leads } from "./schema";
import { eq, or, sql, lt } from "drizzle-orm";
import { Resend } from "resend";
import { escapeHtml, sanitizeNotificationError } from "@/lib/security/sanitize";

export interface RecoveryResult {
  success: boolean;
  leadId: string;
  alreadySent?: boolean;
  error?: string;
  reason?: string;
}

/**
 * Updates notification status for a specific leadId.
 * Guarantees that only bounded, non-PII operational error categories are stored in the database.
 */
export async function updateLeadNotificationStatus(
  leadId: string,
  status: "sent" | "failed",
  errorMessage?: string
): Promise<void> {
  const now = new Date();

  if (status === "sent") {
    await db
      .update(leads)
      .set({
        notificationStatus: "sent",
        notifiedAt: now,
        lastNotificationError: null,
        notificationAttempts: sql`${leads.notificationAttempts} + 1`,
        updatedAt: now,
      })
      .where(eq(leads.leadId, leadId));
  } else {
    await db
      .update(leads)
      .set({
        notificationStatus: "failed",
        lastNotificationError: sanitizeNotificationError(errorMessage),
        lastNotificationAttemptAt: now,
        notificationAttempts: sql`${leads.notificationAttempts} + 1`,
        updatedAt: now,
      })
      .where(eq(leads.leadId, leadId));
  }
}

/**
 * Retrieves leads that have not yet been successfully delivered to the operator.
 */
export async function getPendingOrFailedLeads(limit = 50) {
  return await db
    .select({
      id: leads.id,
      leadId: leads.leadId,
      name: leads.name,
      email: leads.email,
      company: leads.company,
      projectType: leads.projectType,
      budget: leads.budget,
      timeline: leads.timeline,
      preferredContactMethod: leads.preferredContactMethod,
      message: leads.message,
      status: leads.status,
      notificationStatus: leads.notificationStatus,
      notificationAttempts: leads.notificationAttempts,
      lastNotificationError: leads.lastNotificationError,
      lastNotificationAttemptAt: leads.lastNotificationAttemptAt,
      notifiedAt: leads.notifiedAt,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .where(or(eq(leads.notificationStatus, "pending"), eq(leads.notificationStatus, "failed")))
    .limit(limit);
}

/**
 * Retries sending operator notification for a single accepted lead.
 * Does NOT duplicate the lead record.
 */
export async function retryLeadNotification(leadId: string): Promise<RecoveryResult> {
  const rows = await db.select().from(leads).where(eq(leads.leadId, leadId)).limit(1);

  if (!rows || rows.length === 0) {
    return { success: false, leadId, reason: "LEAD_NOT_FOUND" };
  }

  const lead = rows[0];

  if (lead.notificationStatus === "sent") {
    return { success: true, leadId, alreadySent: true };
  }

  const resendApiKey = process.env.RESEND_API_KEY || "";
  if (!resendApiKey) {
    await updateLeadNotificationStatus(
      leadId,
      "failed",
      "RESEND_API_KEY not configured in environment"
    );
    return {
      success: false,
      leadId,
      error: "RESEND_API_KEY not configured in environment",
    };
  }

  const resend = new Resend(resendApiKey);
  const fromEmail = resendApiKey.startsWith("re_")
    ? "YCN Labs <leads@ycnlabs.com>"
    : "onboarding@resend.dev";
  const adminDestEmail = process.env.LEAD_DESTINATION_EMAIL || "hello@ycnlabs.com";

  const safeName = escapeHtml(lead.name);
  const safeCompany = escapeHtml(lead.company || "N/A");

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: adminDestEmail,
      subject: `[RETRY] New Lead: ${safeName} (${safeCompany}) [${leadId}]`,
      text: `Lead ID: ${leadId}\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${
        lead.company || "N/A"
      }\nPreferred Contact: ${lead.preferredContactMethod || "Email"}\nProject Type: ${
        lead.projectType
      }\nBudget: ${lead.budget || "Not specified"}\nTimeline: ${
        lead.timeline || "Not specified"
      }\n\nMessage:\n${lead.message}\n\n[Notification retry attempt: ${
        lead.notificationAttempts + 1
      }]`,
    });

    if (result.error) {
      const safeError = sanitizeNotificationError(result.error.message);
      await updateLeadNotificationStatus(leadId, "failed", safeError);
      return { success: false, leadId, error: safeError };
    }

    await updateLeadNotificationStatus(leadId, "sent");
    return { success: true, leadId };
  } catch (sendError: any) {
    const safeError = sanitizeNotificationError(sendError);
    await updateLeadNotificationStatus(leadId, "failed", safeError);
    return { success: false, leadId, error: safeError };
  }
}

/**
 * Data Subject Deletion Capability:
 * Deletes leads associated with a verified email address.
 */
export async function deleteLeadByEmail(email: string): Promise<{ success: boolean; deletedCount: number }> {
  const normalized = email.trim().toLowerCase();
  const deleted = await db.delete(leads).where(eq(leads.email, normalized)).returning({ id: leads.id });
  return { success: true, deletedCount: deleted.length };
}

/**
 * Data Subject Deletion Capability:
 * Deletes a lead by stable internal ID.
 */
export async function deleteLeadById(leadId: string): Promise<{ success: boolean }> {
  await db.delete(leads).where(eq(leads.leadId, leadId));
  return { success: true };
}

/**
 * Retention Policy Purge Capability:
 * Removes leads created before a specific historical cutoff date.
 * (Not executed automatically; provided for operator-controlled policy enforcement).
 */
export async function purgeLeadsOlderThan(cutoffDate: Date): Promise<{ success: boolean; deletedCount: number }> {
  const deleted = await db.delete(leads).where(lt(leads.createdAt, cutoffDate)).returning({ id: leads.id });
  return { success: true, deletedCount: deleted.length };
}
