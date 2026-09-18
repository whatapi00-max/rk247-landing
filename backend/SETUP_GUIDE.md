# RK247 Wallet System - Complete Setup Guide

## Step-by-Step Setup Instructions

### Phase 1: Supabase Setup

#### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `rk247-wallet`
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Wait for project to be created (~2 minutes)

#### 1.2 Get Supabase Credentials

1. Go to Project Settings → API
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

#### 1.3 Run Database Schema

1. In Supabase dashboard, go to SQL Editor
2. Click "New Query"
3. Copy the entire content from `backend/src/migrations/schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

#### 1.4 Verify Database Tables

1. Go to Table Editor in Supabase
2. You should see these tables:
   - users
   - wallets
   - transactions
   - apay_payments
   - admin_actions

### Phase 2: Backend Setup

#### 2.1 Install Node.js

Ensure you have Node.js 18+ installed:
```bash
node --version
```

If not installed, download from [nodejs.org](https://nodejs.org)

#### 2.2 Install Dependencies

```bash
cd backend
npm install
```

#### 2.3 Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration (from Step 1.2)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT Configuration (generate a random secret)
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long
JWT_EXPIRES_IN=7d

# A-Pay Configuration (YOU WILL PROVIDE THESE)
APAY_API_KEY=
APAY_SECRET_KEY=
APAY_MERCHANT_ID=
APAY_API_URL=https://api.apay.com/v1
APAY_CALLBACK_URL=http://localhost:5000/api/wallet/deposit/callback
APAY_SUCCESS_URL=http://localhost:3000/wallet/success
APAY_FAILURE_URL=http://localhost:3000/wallet/failure

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Admin Configuration
ADMIN_EMAIL=admin@rk247.com
```

#### 2.4 Generate JWT Secret

Use one of these methods:

**Option 1: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: OpenSSL**
```bash
openssl rand -hex 32
```

Copy the output and use it as `JWT_SECRET`

#### 2.5 Update Admin Password

1. Generate a bcrypt hash for your admin password:
   - Go to [https://bcrypt-generator.com/](https://bcrypt-generator.com/)
   - Enter your desired password (e.g., `Admin@12345`)
   - Copy the hash (starts with `$2a$10$...`)

2. In Supabase SQL Editor, run:
```sql
UPDATE users 
SET password = '$2a$10$YOUR_BCRYPT_HASH_HERE'
WHERE email = 'admin@rk247.com';
```

#### 2.6 Start the Backend Server

```bash
npm run dev
```

You should see:
```
🚀 RK247 Wallet API server running on port 5000
Environment: development
Health check: http://localhost:5000/health
```

#### 2.7 Test the API

Open browser or use curl:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "RK247 Wallet API"
}
```

### Phase 3: A-Pay Integration (After You Get Keys)

#### 3.1 Get A-Pay Credentials

Contact A-Pay to get:
- API Key
- Secret Key
- Merchant ID
- API Base URL

#### 3.2 Update .env File

```env
APAY_API_KEY=your_actual_api_key_here
APAY_SECRET_KEY=your_actual_secret_key_here
APAY_MERCHANT_ID=your_actual_merchant_id_here
APAY_API_URL=https://api.apay.com/v1  # Use actual A-Pay URL
```

#### 3.3 Configure A-Pay Webhook

In your A-Pay merchant dashboard:
1. Go to Webhook Settings
2. Set Callback URL: `https://your-domain.com/api/wallet/deposit/callback`
3. Set Success URL: `https://your-domain.com/wallet/success`
4. Set Failure URL: `https://your-domain.com/wallet/failure`

**Note**: For local testing, use ngrok or similar to expose localhost:
```bash
ngrok http 5000
# Use the ngrok URL for callback
```

#### 3.4 Test Payment Flow

1. Register a test user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@12345",
    "username": "testuser"
  }'
```

2. Login and get token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@12345"
  }'
```

3. Initiate deposit:
```bash
curl -X POST http://localhost:5000/api/wallet/deposit/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 1000
  }'
```

### Phase 4: Frontend Integration

#### 4.1 Install Axios (if not already)

```bash
cd ..  # Go back to root
npm install axios
```

#### 4.2 Create API Client

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

export const walletAPI = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: (params) => api.get('/wallet/transactions', { params }),
  initiateDeposit: (amount) => api.post('/wallet/deposit/initiate', { amount }),
  getDepositStatus: (transactionId) => api.get(`/wallet/deposit/status/${transactionId}`)
};

export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserWallet: (userId) => api.get(`/admin/users/${userId}/wallet`),
  deductPoints: (walletId, data) => api.post(`/admin/wallet/${walletId}/deduct-points`, data),
  adjustBalance: (walletId, data) => api.post(`/admin/wallet/${walletId}/adjust`, data),
  getTransactions: (params) => api.get('/admin/transactions', { params }),
  getDashboardStats: () => api.get('/admin/dashboard/stats')
};

export default api;
```

### Phase 5: Testing Checklist

- [ ] Backend server starts without errors
- [ ] Health check endpoint responds
- [ ] User registration works
- [ ] User login works and returns JWT token
- [ ] Wallet balance endpoint works (requires auth)
- [ ] Transaction history endpoint works
- [ ] Admin login works
- [ ] Admin can view users
- [ ] Admin can view user wallets
- [ ] Admin can deduct points
- [ ] Database tables are created correctly
- [ ] Supabase connection is working

### Phase 6: Production Deployment

#### 6.1 Update Environment Variables

For production, update:
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-production-domain.com
APAY_CALLBACK_URL=https://your-api-domain.com/api/wallet/deposit/callback
APAY_SUCCESS_URL=https://your-production-domain.com/wallet/success
APAY_FAILURE_URL=https://your-production-domain.com/wallet/failure
```

#### 6.2 Deploy Backend

**Option 1: Railway**
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables
5. Deploy

**Option 2: Render**
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Add environment variables
6. Deploy

#### 6.3 Update Supabase RLS Policies

For production, review and update Row Level Security policies in Supabase.

## Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution**: Check that all Supabase variables are set in `.env`

### Issue: "Invalid token"
**Solution**: Ensure JWT_SECRET is set and token is being sent in Authorization header

### Issue: "A-Pay credentials not configured"
**Solution**: This is expected until you add your A-Pay keys. The system will work for all other features.

### Issue: Database connection error
**Solution**: Verify Supabase URL and keys are correct. Check Supabase project is active.

### Issue: CORS errors
**Solution**: Ensure FRONTEND_URL in `.env` matches your frontend URL

## Next Steps

1. ✅ Complete backend setup
2. ✅ Test all endpoints
3. ⏳ Get A-Pay credentials and integrate
4. ⏳ Build frontend wallet UI
5. ⏳ Build admin dashboard UI
6. ⏳ Deploy to production

## Support

If you encounter any issues:
1. Check the logs in `backend/logs/`
2. Verify all environment variables are set
3. Ensure Supabase database is properly configured
4. Review the API documentation in README.md

---

**Ready to integrate A-Pay?** Once you have your A-Pay credentials, simply update the `.env` file and restart the server. The payment flow will work automatically!
