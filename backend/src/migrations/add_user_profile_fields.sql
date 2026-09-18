-- Add user profile fields for "My Profile" page
-- Run this in Supabase SQL Editor

ALTER TABLE users
    ADD COLUMN IF NOT EXISTS full_name VARCHAR(150),
    ADD COLUMN IF NOT EXISTS phone VARCHAR(30),
    ADD COLUMN IF NOT EXISTS country VARCHAR(100),
    ADD COLUMN IF NOT EXISTS city VARCHAR(100),
    ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Phone is used for login, so it must be unique (existing rows may have NULL)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone_unique
    ON users(phone) WHERE phone IS NOT NULL AND phone <> '';
