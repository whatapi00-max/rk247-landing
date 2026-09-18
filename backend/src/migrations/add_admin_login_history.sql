-- Tracks every successful admin login with network/location details
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

CREATE INDEX IF NOT EXISTS idx_admin_login_history_admin_id ON admin_login_history(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_login_history_created_at ON admin_login_history(created_at DESC);

ALTER TABLE admin_login_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS service_role_all_admin_login_history ON admin_login_history;
CREATE POLICY service_role_all_admin_login_history ON admin_login_history
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');
