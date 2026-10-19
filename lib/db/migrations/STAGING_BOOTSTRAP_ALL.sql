-- YCN Labs — Staging & Production Bootstrap All-In-One Schema
-- Purpose: Complete, idempotent SQL script to bootstrap the database on Neon/PostgreSQL
-- Covers: Baseline tables, Migration 0001 (Phase 7 Hardening), Migration 0002 (Phase 12 Idempotency)
-- Safety: Strictly additive. Uses IF NOT EXISTS throughout. No DROP, no TRUNCATE.

-- ============================================================================
-- 1. Table: leads (Baseline + 0001 + 0002)
-- ============================================================================
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  lead_id TEXT NOT NULL,
  idempotency_key TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  budget TEXT,
  timeline TEXT,
  preferred_contact_method TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'accepted',
  notification_status TEXT NOT NULL DEFAULT 'pending',
  notification_attempts INTEGER NOT NULL DEFAULT 0,
  last_notification_error TEXT,
  last_notification_attempt_at TIMESTAMP,
  notified_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Defensive additive alterations in case the table existed in a pre-hardened state:
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS idempotency_key TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'accepted';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notification_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notification_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_notification_error TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_notification_attempt_at TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notified_at TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();

-- Backfill lead_id if legacy rows exist with null lead_id
UPDATE leads SET lead_id = 'legacy_' || id::text WHERE lead_id IS NULL;
ALTER TABLE leads ALTER COLUMN lead_id SET NOT NULL;

-- Indexes for performance, deduplication, and operational recovery
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_lead_id ON leads(lead_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_idempotency_key ON leads(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_leads_notification_status ON leads(notification_status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- ============================================================================
-- 2. Table: newsletter_signups (Baseline schema)
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_signups_email ON newsletter_signups(email);
