-- Migration: Add custom_transaction_id column to transactions table
-- Run this in Supabase SQL Editor to add the column to existing databases

-- Add custom_transaction_id column
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS custom_transaction_id VARCHAR(255) UNIQUE;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_custom_transaction_id ON transactions(custom_transaction_id);
