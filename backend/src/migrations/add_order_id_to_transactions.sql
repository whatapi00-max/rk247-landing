-- Migration: Add order_id column to transactions table
-- Run this in Supabase SQL Editor to add the column to existing databases

-- Add order_id column to transactions table
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS order_id VARCHAR(255);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);
