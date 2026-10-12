-- Phase 7 Contact Backend Hardening: Additive schema migration for leads table
-- Safe, idempotent additive changes for PostgreSQL

ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'accepted';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notification_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notification_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_notification_error TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_notification_attempt_at TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notified_at TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();

-- Ensure lead_id is populated for any pre-existing rows
UPDATE leads SET lead_id = 'legacy_' || id::text WHERE lead_id IS NULL;
ALTER TABLE leads ALTER COLUMN lead_id SET NOT NULL;

-- Indexes for performance, deduplication, and operational recovery
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_lead_id ON leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_leads_notification_status ON leads(notification_status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
