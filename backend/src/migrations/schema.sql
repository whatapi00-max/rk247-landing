-- RK247 Wallet System Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    full_name VARCHAR(150),
    phone VARCHAR(30),
    country VARCHAR(100),
    city VARCHAR(100),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    is_active BOOLEAN DEFAULT true,
    force_password_change BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallets Table
CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15, 2) DEFAULT 0.00 CHECK (balance >= 0),
    currency VARCHAR(10) DEFAULT 'PKR',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'trading_id_deduction', 'admin_adjustment')),
    amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    reference_id VARCHAR(255),
    order_id VARCHAR(255),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Withdrawals Table
CREATE TABLE IF NOT EXISTS withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(15, 2) NOT NULL,
    payment_system VARCHAR(50) NOT NULL,
    account_data JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A-Pay Payments Table
CREATE TABLE IF NOT EXISTS apay_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID UNIQUE NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    apay_transaction_id VARCHAR(255) UNIQUE,
    order_id VARCHAR(255),
    amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method VARCHAR(50),
    payment_url TEXT,
    callback_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Actions Log Table
CREATE TABLE IF NOT EXISTS admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id),
    action_type VARCHAR(50) NOT NULL,
    target_user_id UUID REFERENCES users(id),
    target_wallet_id UUID REFERENCES wallets(id),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Login History Table
CREATE TABLE IF NOT EXISTS admin_login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(64),
    user_agent TEXT,
    city VARCHAR(100),
    region VARCHAR(100),
    country VARCHAR(100),
    isp VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_wallet_id ON withdrawals(wallet_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_created_at ON withdrawals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apay_payments_transaction_id ON apay_payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_apay_payments_apay_transaction_id ON apay_payments(apay_transaction_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_admin_id ON admin_actions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_login_history_admin_id ON admin_login_history(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_login_history_created_at ON admin_login_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Updated At Triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_wallets_updated_at ON wallets;
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_apay_payments_updated_at ON apay_payments;
CREATE TRIGGER update_apay_payments_updated_at BEFORE UPDATE ON apay_payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create Wallet Automatically on User Registration
CREATE OR REPLACE FUNCTION create_wallet_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO wallets (user_id, balance, currency)
    VALUES (NEW.id, 0.00, 'PKR');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_wallet_for_user ON users;
CREATE TRIGGER trigger_create_wallet_for_user
    AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION create_wallet_for_user();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE apay_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_login_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
DROP POLICY IF EXISTS users_select_own ON users;
CREATE POLICY users_select_own ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can view their own wallet
DROP POLICY IF EXISTS wallets_select_own ON wallets;
CREATE POLICY wallets_select_own ON wallets
    FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own transactions
DROP POLICY IF EXISTS transactions_select_own ON transactions;
CREATE POLICY transactions_select_own ON transactions
    FOR SELECT USING (
        wallet_id IN (SELECT id FROM wallets WHERE user_id = auth.uid())
    );

-- Users can view their own withdrawals
DROP POLICY IF EXISTS withdrawals_select_own ON withdrawals;
CREATE POLICY withdrawals_select_own ON withdrawals
    FOR SELECT USING (user_id = auth.uid());

-- Service role can do everything (for backend operations)
DROP POLICY IF EXISTS service_role_all_users ON users;
CREATE POLICY service_role_all_users ON users
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS service_role_all_wallets ON wallets;
CREATE POLICY service_role_all_wallets ON wallets
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS service_role_all_transactions ON transactions;
CREATE POLICY service_role_all_transactions ON transactions
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS service_role_all_withdrawals ON withdrawals;
CREATE POLICY service_role_all_withdrawals ON withdrawals
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS service_role_all_apay_payments ON apay_payments;
CREATE POLICY service_role_all_apay_payments ON apay_payments
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS service_role_all_admin_actions ON admin_actions;
CREATE POLICY service_role_all_admin_actions ON admin_actions
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS service_role_all_admin_login_history ON admin_login_history;
CREATE POLICY service_role_all_admin_login_history ON admin_login_history
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Insert default admin user (password: Admin@123 - CHANGE THIS!)
-- Password hash for 'Admin@123' using bcrypt
INSERT INTO users (email, password, username, role)
VALUES (
    'admin@rk247.com',
    '$2a$10$YourHashedPasswordHere',
    'Admin',
    'admin'
) ON CONFLICT (email) DO NOTHING;
