/**
 * Operator Recovery Tool for Contact Form Leads
 * Usage:
 *   pnpm tsx scripts/recover-leads.ts --list
 *   pnpm tsx scripts/recover-leads.ts --retry <leadId>
 *   pnpm tsx scripts/recover-leads.ts --delete-email <email>
 */

import { getPendingOrFailedLeads, retryLeadNotification, deleteLeadByEmail } from "../lib/db/recovery";

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h") {
    console.log(`
YCN Labs — Contact Lead Recovery & Operator Tool

Commands:
  --list                     List all pending or failed notification leads
  --retry <leadId>           Retry operator notification for a specific lead
  --delete-email <email>     Delete all leads for an email (Data Subject Request)
    `);
    process.exit(0);
  }

  if (command === "--list") {
    console.log("🔍 Checking for pending or failed notifications...");
    const leadsList = await getPendingOrFailedLeads();
    if (leadsList.length === 0) {
      console.log("✅ No pending or failed notifications found. All leads delivered.");
    } else {
      console.log(`⚠️ Found ${leadsList.length} undelivered lead(s):\n`);
      for (const lead of leadsList) {
        console.log({
          leadId: lead.leadId,
          status: lead.status,
          notificationStatus: lead.notificationStatus,
          attempts: lead.notificationAttempts,
          lastError: lead.lastNotificationError,
          lastAttemptAt: lead.lastNotificationAttemptAt,
          createdAt: lead.createdAt,
        });
      }
    }
    process.exit(0);
  }

  if (command === "--retry") {
    const leadId = args[1];
    if (!leadId) {
      console.error("❌ Error: Missing <leadId> argument");
      process.exit(1);
    }
    console.log(`🔄 Retrying notification for lead: ${leadId}...`);
    const result = await retryLeadNotification(leadId);
    if (result.success) {
      console.log(`✅ Success: Notification sent for ${leadId}`);
    } else {
      console.error(`❌ Failed to send notification: ${result.error || result.reason}`);
    }
    process.exit(result.success ? 0 : 1);
  }

  if (command === "--delete-email") {
    const email = args[1];
    if (!email) {
      console.error("❌ Error: Missing <email> argument");
      process.exit(1);
    }
    console.log(`🗑️ Processing data subject deletion request for: ${email}...`);
    const result = await deleteLeadByEmail(email);
    console.log(`✅ Deletion complete. Removed ${result.deletedCount} record(s).`);
    process.exit(0);
  }

  console.error(`❌ Unknown command: ${command}`);
  process.exit(1);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
