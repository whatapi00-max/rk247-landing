# RK247 Wallet System - Complete Setup Guide

## 🎯 What You Have

A **complete, production-ready wallet system** with:

### Backend (Node/Express + Supabase)
- ✅ 15 API endpoints (auth, wallet, admin)
- ✅ JWT authentication
- ✅ A-Pay payment gateway integration
- ✅ Admin dashboard backend
- ✅ Transaction management
- ✅ Audit logging

### Frontend (TypeScript + Vite)
- ✅ Login/Register pages
- ✅ User wallet dashboard
- ✅ Deposit interface
- ✅ Transaction history
- ✅ Admin dashboard
- ✅ User management interface
- ✅ Wallet management (deduct points, adjust balance)
- ✅ Transaction monitoring

---

## 📋 Setup Instructions

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ..  # Back to root
npm install
```

### Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to Project Settings → API
4. Copy:
   - Project URL
   - anon/public key
   - service_role key

5. Go to SQL Editor
6. Run the schema from `backend/src/migrations/schema.sql`

### Step 3: Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# Add your Supabase credentials
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate a random JWT secret
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long
JWT_EXPIRES_IN=7d

# A-Pay (add when you get keys)
APAY_API_KEY=
APAY_SECRET_KEY=
APAY_MERCHANT_ID=
APAY_API_URL=https://api.apay.com/v1
APAY_CALLBACK_URL=http://localhost:5000/api/wallet/deposit/callback
APAY_SUCCESS_URL=http://localhost:3000/wallet/success
APAY_FAILURE_URL=http://localhost:3000/wallet/failure

FRONTEND_URL=http://localhost:3000
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Configure Frontend Environment

```bash
cd ..  # Back to root
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Update Admin Password

1. Generate bcrypt hash at [bcrypt-generator.com](https://bcrypt-generator.com/)
2. In Supabase SQL Editor:
```sql
UPDATE users 
SET password = '$2a$10$YOUR_BCRYPT_HASH_HERE'
WHERE email = 'admin@rk247.com';
```

### Step 6: Start Both Servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Should see:
```
🚀 RK247 Wallet API server running on port 5000
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

Should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## 🧪 Testing the System

### 1. Test Backend Health
```bash
curl http://localhost:5000/health
```

### 2. Create Test User
Go to: `http://localhost:3000/register`
- Username: testuser
- Email: test@example.com
- Password: Test@12345

### 3. Login as User
Go to: `http://localhost:3000/login`
- Login with test account
- Should redirect to `/wallet`

### 4. Test Wallet Features
- View balance (should be ₹0.00)
- View transaction history (empty)
- Try deposit (will show A-Pay error until keys added)

### 5. Login as Admin
Go to: `http://localhost:3000/login`
- Email: admin@rk247.com
- Password: (your admin password)
- Should redirect to `/admin/dashboard`

### 6. Test Admin Features
- View dashboard stats
- Go to Users page
- Click "View Wallet" on test user
- Try "Deduct Points" (enter amount and description)
- Try "Adjust Balance" (credit or debit)

---

## 🔑 Adding A-Pay Keys

Once you get your A-Pay credentials:

1. Edit `backend/.env`:
```env
APAY_API_KEY=your_actual_api_key
APAY_SECRET_KEY=your_actual_secret_key
APAY_MERCHANT_ID=your_actual_merchant_id
APAY_API_URL=https://api.apay.com/v1  # Use actual URL
```

2. Restart backend server
3. Test deposit flow:
   - Login as user
   - Go to wallet
   - Click "Deposit Funds"
   - Enter amount (min ₹100)
   - Should redirect to A-Pay payment page

---

## 📱 Available Routes

### Public Routes
- `/` - Home page
- `/login` - User/Admin login
- `/register` - User registration

### User Routes (Requires Login)
- `/wallet` - Wallet dashboard
  - View balance
  - Deposit funds
  - Transaction history

### Admin Routes (Requires Admin Login)
- `/admin/dashboard` - Overview & stats
- `/admin/users` - User management
  - Search users
  - View user wallets
  - Deduct points
  - Adjust balance
- `/admin/transactions` - All transactions
  - Filter by type/status
  - Pagination

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Wallet (User)
- `GET /api/wallet/balance` - Get balance
- `GET /api/wallet/transactions` - Transaction history
- `POST /api/wallet/deposit/initiate` - Start deposit
- `POST /api/wallet/deposit/callback` - A-Pay webhook
- `GET /api/wallet/deposit/status/:id` - Check status

### Admin
- `GET /api/admin/users` - List users
- `GET /api/admin/users/:userId/wallet` - User wallet
- `POST /api/admin/wallet/:walletId/deduct-points` - Deduct points
- `POST /api/admin/wallet/:walletId/adjust` - Adjust balance
- `GET /api/admin/transactions` - All transactions
- `GET /api/admin/admin-actions` - Audit log
- `GET /api/admin/dashboard/stats` - Dashboard stats

Full API documentation: `backend/API_DOCUMENTATION.md`

---

## 🎨 Features Implemented

### User Features
✅ Registration with automatic wallet creation  
✅ Login with JWT tokens  
✅ View wallet balance  
✅ Deposit funds via A-Pay  
✅ View transaction history  
✅ Responsive UI with Tailwind CSS  

### Admin Features
✅ Admin dashboard with statistics  
✅ User search and management  
✅ View any user's wallet  
✅ Deduct points for trading ID activation  
✅ Manual balance adjustments (credit/debit)  
✅ View all transactions with filters  
✅ Complete audit trail  

### Security
✅ JWT authentication  
✅ Password hashing (bcrypt)  
✅ Rate limiting  
✅ Input validation  
✅ CORS protection  
✅ Admin-only routes  
✅ Audit logging  

---

## 📊 Database Schema

### Tables Created
1. **users** - User accounts
2. **wallets** - User wallets (auto-created)
3. **transactions** - All transactions
4. **apay_payments** - A-Pay payment tracking
5. **admin_actions** - Admin audit log

### Automatic Features
- Wallet created on user signup
- Updated timestamps on changes
- Balance validation (no negative)
- Transaction status tracking

---

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Push code to GitHub
2. Create new project on Railway/Render
3. Connect GitHub repo
4. Add environment variables
5. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project on Vercel
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
4. Deploy

### Production Environment Variables

Update these for production:

**Backend:**
```env
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
APAY_CALLBACK_URL=https://your-api-domain.com/api/wallet/deposit/callback
APAY_SUCCESS_URL=https://your-domain.com/wallet/success
APAY_FAILURE_URL=https://your-domain.com/wallet/failure
```

**Frontend:**
```env
VITE_API_URL=https://your-api-domain.com/api
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check Supabase credentials
- Verify all env variables are set
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS settings in backend

### A-Pay integration not working
- Verify A-Pay credentials are correct
- Check A-Pay API URL
- Review backend logs for errors
- Ensure webhook URL is accessible

### Login not working
- Check JWT_SECRET is set
- Verify user exists in database
- Check password hash is correct

### Admin can't access admin pages
- Verify user role is 'admin' in database
- Check JWT token is valid
- Clear browser localStorage and login again

---

## 📚 Documentation Files

- `backend/README.md` - Backend overview
- `backend/SETUP_GUIDE.md` - Detailed backend setup
- `backend/API_DOCUMENTATION.md` - Complete API reference
- `INTEGRATION_SUMMARY.md` - What's implemented
- `WALLET_SYSTEM_PLAN.md` - Original plan

---

## ✅ Checklist

### Initial Setup
- [ ] Install backend dependencies
- [ ] Install frontend dependencies
- [ ] Create Supabase project
- [ ] Run database schema
- [ ] Configure backend .env
- [ ] Configure frontend .env
- [ ] Generate JWT secret
- [ ] Update admin password
- [ ] Start backend server
- [ ] Start frontend server

### Testing
- [ ] Test backend health endpoint
- [ ] Create test user account
- [ ] Login as user
- [ ] View wallet balance
- [ ] Login as admin
- [ ] View admin dashboard
- [ ] Test user management
- [ ] Test point deduction
- [ ] Test balance adjustment

### A-Pay Integration
- [ ] Get A-Pay credentials
- [ ] Add keys to backend .env
- [ ] Configure webhook URL
- [ ] Test deposit flow
- [ ] Verify callback handling

### Production
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Update production env vars
- [ ] Configure A-Pay production URLs
- [ ] Test production deployment
- [ ] Set up monitoring
- [ ] Configure backups

---

## 🎉 You're All Set!

Everything is ready to use. The system includes:

- Complete backend API
- Full frontend UI
- Admin dashboard
- User wallet management
- A-Pay integration (ready for keys)
- Security features
- Comprehensive documentation

**Next Steps:**
1. Complete the setup checklist above
2. Test all features locally
3. Get your A-Pay credentials
4. Deploy to production

For questions, check the documentation files or review the code comments.

**Happy Trading! 🚀**
