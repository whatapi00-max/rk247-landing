-- Add order_id column to apay_payments table
ALTER TABLE apay_payments
ADD COLUMN IF NOT EXISTS order_id VARCHAR(255);
