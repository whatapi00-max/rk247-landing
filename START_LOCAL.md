# 🚀 Start RK247 Wallet System Locally

## Quick Start Commands

### Step 1: Install Dependencies

Open **two terminals** in the project root:

#### Terminal 1 - Install Backend Dependencies
```bash
cd backend
npm install
```

#### Terminal 2 - Install Frontend Dependencies
```bash
npm install
```

---

### Step 2: Configure Environment (First Time Only)

#### Backend Configuration
```bash
cd backend
copy .env.example .env
```

**Edit `backend/.env` and add:**
```env
PORT=5000
NODE_ENV=development

# Supabase (get from supabase.com)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your_generated_secret_here
JWT_EXPIRES_IN=7d

# A-Pay (leave empty for now, add when you get keys)
APAY_API_KEY=
APAY_SECRET_KEY=
APAY_MERCHANT_ID=
APAY_API_URL=https://api.apay.com/v1
APAY_CALLBACK_URL=http://localhost:5000/api/wallet/deposit/callback
APAY_SUCCESS_URL=http://localhost:3000/wallet
APAY_FAILURE_URL=http://localhost:3000/wallet

FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration
```bash
cd ..
copy .env.example .env
```

**Edit `.env` and add:**
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: Set Up Supabase Database (First Time Only)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Copy and run `backend/src/migrations/schema.sql`
5. Get your API keys from Project Settings → API

---

### Step 4: Start Both Servers

#### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

**You should see:**
```
🚀 RK247 Wallet API server running on port 5000
Environment: development
Health check: http://localhost:5000/health
```

#### Terminal 2 - Start Frontend
```bash
npm run dev
```

**You should see:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## ✅ Verify Everything Works

### 1. Test Backend
Open browser: http://localhost:5000/health

Should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "RK247 Wallet API"
}
```

### 2. Test Frontend
Open browser: http://localhost:3000

Should see the RK247 homepage

### 3. Test Wallet Pages
- Register: http://localhost:3000/register
- Login: http://localhost:3000/login
- Wallet: http://localhost:3000/wallet (requires login)
- Admin: http://localhost:3000/admin/dashboard (requires admin login)

---

## 🔑 Default Admin Login

**Email:** admin@rk247.com  
**Password:** You need to set this in Supabase

### Set Admin Password:
1. Generate hash at [bcrypt-generator.com](https://bcrypt-generator.com/)
2. In Supabase SQL Editor:
```sql
UPDATE users 
SET password = '$2a$10$YOUR_BCRYPT_HASH_HERE'
WHERE email = 'admin@rk247.com';
```

---

## 🧪 Test the System

### Create Test User
1. Go to http://localhost:3000/register
2. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: Test@12345
3. Click "Create Account"
4. Should redirect to wallet page

### Test User Features
1. View wallet balance (₹0.00)
2. View transaction history (empty)
3. Try deposit (will show A-Pay error until keys added)

### Test Admin Features
1. Go to http://localhost:3000/login
2. Login with admin credentials
3. Should redirect to admin dashboard
4. Click "Users" to see all users
5. Click "View Wallet" on test user
6. Try "Deduct Points" or "Adjust Balance"

---

## 🐛 Troubleshooting

### Backend won't start
**Error:** "Missing Supabase environment variables"
- Check `backend/.env` has all Supabase credentials
- Verify Supabase project is active

**Error:** "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in backend/.env
PORT=5001
```

### Frontend can't connect to backend
**Error:** Network errors in browser console
- Verify backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors

### Login not working
- Verify JWT_SECRET is set in `backend/.env`
- Check browser console for errors
- Clear browser localStorage and try again

### Admin can't access admin pages
- Verify user role is 'admin' in Supabase
- Check admin password is set correctly
- Clear localStorage and login again

---

## 📝 Quick Commands Reference

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
```

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎯 What to Do After Starting

1. ✅ Create test user account
2. ✅ Test wallet features
3. ✅ Set admin password
4. ✅ Test admin features
5. ⏳ Get A-Pay credentials
6. ⏳ Add A-Pay keys to backend/.env
7. ⏳ Test payment flow

---

## 📚 Need Help?

- **Setup Issues:** Check `COMPLETE_SETUP_GUIDE.md`
- **API Reference:** Check `backend/API_DOCUMENTATION.md`
- **Backend Setup:** Check `backend/SETUP_GUIDE.md`

---

## 🚀 You're Ready!

Both servers should now be running:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **API Health:** http://localhost:5000/health

**Start testing the wallet system!** 🎉
