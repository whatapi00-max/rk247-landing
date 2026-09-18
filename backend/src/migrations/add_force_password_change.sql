-- Add force_password_change flag (used by admin password-reset flow and change-password endpoint)
-- Run this in Supabase SQL Editor

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS force_password_change BOOLEAN DEFAULT false;
