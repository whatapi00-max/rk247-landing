# ✅ A-Pay Integration Test Guide

## 🎉 A-Pay Credentials Configured!

Your A-Pay credentials have been successfully added to the system:

- **Project ID:** 2622547
- **API Key:** b0e662e70ce72c176b03885a17758d40
- **Access Key:** 45477c9efd2df0b15da0e00c6da2083a
- **Private Key:** 487b4bea41bdeb15ca505ec15b4f5f2b

## 🧪 How to Test

### **1. Access the Application**

Open your browser and go to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

### **2. Create a Test User**

1. Go to: http://localhost:5173/register
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test@12345`
3. Click "Create Account"
4. You'll be redirected to the wallet page

### **3. Test Deposit Flow**

1. On the wallet page, click **"Deposit Funds"**
2. Enter amount: `100` (minimum ₹100)
3. Click **"Proceed to Payment"**
4. You should be redirected to A-Pay payment page
5. Complete the UPI payment
6. After payment, you'll return to your wallet
7. Check if balance is updated

### **4. Check Transaction History**

On the wallet page, scroll down to see:
- Transaction type: Deposit
- Amount: ₹100
- Status: Completed (after payment)
- Date/Time

### **5. Test Admin Features**

1. Go to: http://localhost:5173/login
2. Login with admin credentials:
   - Email: `admin@rk247.com`
   - Password: (set via Supabase)
3. Go to Admin Dashboard
4. View users, transactions, etc.

## 🔍 Verify A-Pay Integration

### **Check Backend Logs**

The backend will log A-Pay operations:
```
info: Deposit initiated for user xxx: 100
```

### **Check Database**

In Supabase, check these tables:
- `transactions` - Should show pending deposit
- `apay_payments` - Should show A-Pay payment record
- After webhook: Status should update to 'completed'

### **Test API Directly**

```bash
# Get your JWT token first by logging in
# Then test deposit:

curl -X POST http://localhost:5000/api/wallet/deposit/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"amount": 100}'
```

Expected response:
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "transaction_id": "xxx",
    "payment_url": "https://...",
    "apay_transaction_id": "xxx"
  }
}
```

## 🎯 What Happens During Payment

1. **User clicks "Deposit"**
   - Frontend calls: `POST /api/wallet/deposit/initiate`
   - Backend creates transaction in database
   - Backend calls A-Pay API
   - A-Pay returns payment URL

2. **User redirected to A-Pay**
   - User sees UPI payment page
   - User completes payment via UPI app

3. **A-Pay sends webhook**
   - A-Pay calls: `POST /api/wallet/deposit/callback`
   - Backend verifies signature
   - Backend updates transaction status
   - Backend updates wallet balance

4. **User returns to wallet**
   - User sees updated balance
   - Transaction shows as "Completed"

## ✅ Success Indicators

- ✅ Payment URL is generated
- ✅ User redirected to A-Pay page
- ✅ Webhook received and verified
- ✅ Transaction status updated to "completed"
- ✅ Wallet balance increased
- ✅ Transaction appears in history

## ⚠️ Troubleshooting

### **"A-Pay credentials not configured"**
- Check `backend/.env` file has all A-Pay variables
- Restart backend server

### **Payment URL not generated**
- Check backend logs for errors
- Verify A-Pay API is accessible
- Check amount is ≥ ₹100

### **Webhook not received**
- For local testing, A-Pay can't reach localhost
- Use ngrok or deploy to test webhooks:
  ```bash
  ngrok http 5000
  # Update APAY_CALLBACK_URL with ngrok URL
  ```

### **Balance not updated**
- Check webhook signature verification
- Check backend logs for webhook errors
- Verify transaction status in database

## 🚀 Production Deployment

When deploying to production:

1. **Update callback URL:**
   ```env
   APAY_CALLBACK_URL=https://your-api-domain.com/api/wallet/deposit/callback
   APAY_RETURN_URL=https://your-domain.com/wallet
   ```

2. **Use HTTPS** - A-Pay requires HTTPS for webhooks

3. **Test thoroughly** with small amounts first

4. **Monitor logs** for any issues

## 📊 Monitoring

Check these regularly:
- Backend logs: `backend/logs/combined.log`
- Supabase dashboard: Transaction status
- A-Pay dashboard: Payment status

---

**Everything is ready! Start testing your deposit flow now!** 🎉
