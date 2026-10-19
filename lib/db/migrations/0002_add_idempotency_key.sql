-- Phase 12 Enquiry Reliability: Additive idempotency_key column for deduplication
-- Safe, idempotent additive changes for PostgreSQL

ALTER TABLE leads ADD COLUMN IF NOT EXISTS idempotency_key TEXT;

-- Create unique index on idempotency_key for atomic ON CONFLICT deduplication
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_idempotency_key ON leads(idempotency_key);
