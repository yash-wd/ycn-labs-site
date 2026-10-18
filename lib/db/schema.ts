import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  leadId: text("lead_id").notNull().unique(),
  idempotencyKey: text("idempotency_key").unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  preferredContactMethod: text("preferred_contact_method"),
  message: text("message"),
  status: text("status").default("accepted").notNull(),
  notificationStatus: text("notification_status").default("pending").notNull(),
  notificationAttempts: integer("notification_attempts").default(0).notNull(),
  lastNotificationError: text("last_notification_error"),
  lastNotificationAttemptAt: timestamp("last_notification_attempt_at"),
  notifiedAt: timestamp("notified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const newsletterSignups = pgTable("newsletter_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
