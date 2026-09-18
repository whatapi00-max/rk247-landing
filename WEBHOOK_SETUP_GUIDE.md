# Payment Webhook Setup Guide

## ✅ What's Been Done

I've automatically configured your backend to handle payment webhooks from A-Pay:

### 1. Created Webhook Route
- **Endpoint**: `/api/webhook/apay/callback`
- **Location**: `backend/src/routes/webhook.js`
- **Function**: Receives payment notifications from A-Pay and updates transaction status

### 2. Updated Configuration
Your `.env` file has been updated with:
- `APAY_CALLBACK_URL=http://localhost:5000/api/webhook/apay/callback`
- `APAY_RETURN_URL=http://localhost:5173/`
- `FRONTEND_URL=http://localhost:5173`

### 3. Registered Route
The webhook route is now registered in `backend/src/index.js`

## 🔧 What You Need to Do

### Step 1: Restart Your Backend Server

Stop your current backend server and restart it to load the new webhook route:

```bash
# Stop the server (Ctrl+C)
# Then restart:
cd backend
npm start
```

### Step 2: Configure A-Pay Webhook

You need to configure the webhook URL in your A-Pay dashboard:

1. Log in to your A-Pay dashboard
2. Navigate to **Settings** → **Webhooks** or **API Settings**
3. Add a new webhook:
   - **Webhook URL**: `http://localhost:5000/api/webhook/apay/callback`
   - **Events**: Select "Payment Success" and "Payment Failed"
   - **Method**: POST
   - **Security**: Enable signature verification (your access key and private key are already configured)

**For Production:**
Replace `localhost:5000` with your actual domain:
- Example: `https://yourdomain.com/api/webhook/apay/callback`

### Step 3: Test the Webhook

#### Test 1: Verify Webhook Endpoint is Accessible

```bash
curl -X POST http://localhost:5000/api/webhook/apay/callback \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

Expected response: `{"success": false, "error": "Webhook processing failed"}` (this is normal for a test)

#### Test 2: Make a Real Deposit

1. Go to your frontend: `http://localhost:5173`
2. Login to your account
3. Click the wallet button in the navbar
4. Click "Deposit"
5. Enter an amount (minimum PKR 100)
6. Complete the payment on A-Pay
7. Check your account statement - the transaction should show as "completed"

## 📋 How It Works

### Payment Flow:

1. **User Initiates Deposit**
   - User enters amount in deposit popup
   - Frontend calls `/api/wallet/deposit/initiate`
   - Backend creates transaction record with status "pending"
   - Backend calls A-Pay API to create payment page
   - User is redirected to A-Pay payment page

2. **User Completes Payment**
   - User makes payment on A-Pay
   - A-Pay processes the payment

3. **A-Pay Sends Webhook**
   - A-Pay sends POST request to your webhook endpoint
   - Webhook includes: access_key, signature, transaction status
   - Your backend verifies the signature for security

4. **Backend Processes Webhook**
   - Updates transaction status to "completed" (or "failed")
   - If successful, adds amount to user's wallet balance
   - Returns success response to A-Pay

5. **User Sees Updated Status**
   - Transaction shows as "completed" in account statement
   - Wallet balance is updated
   - User can now withdraw funds

## 🔍 Troubleshooting

### Issue: Transactions Still Show as "Pending"

**Possible Causes:**
1. Backend server not restarted after webhook setup
2. A-Pay webhook not configured correctly
3. Webhook URL is incorrect
4. Signature verification failing

**Solutions:**
1. Restart backend server
2. Check A-Pay dashboard webhook settings
3. Verify webhook URL matches your .env configuration
4. Check backend logs for webhook errors

### Issue: Webhook Not Receiving Callbacks

**Possible Causes:**
1. Webhook URL not accessible from internet (for production)
2. Firewall blocking webhook requests
3. A-Pay not sending webhooks

**Solutions:**
1. Use ngrok or similar for local testing
2. Configure firewall to allow webhook requests
3. Contact A-Pay support

### Issue: Balance Not Updating

**Possible Causes:**
1. Database connection issue
2. Transaction not found in database
3. Error in webhook processing

**Solutions:**
1. Check backend logs for errors
2. Verify transaction exists in database
3. Check webhook route for errors

## 🚀 Production Deployment

For production deployment, update these values in your `.env`:

```env
APAY_CALLBACK_URL=https://yourdomain.com/api/webhook/apay/callback
APAY_RETURN_URL=https://yourdomain.com/
FRONTEND_URL=https://yourdomain.com
```

## 📞 Support

If you encounter any issues:
1. Check backend logs: `backend/logs/`
2. Verify A-Pay webhook configuration
3. Test webhook endpoint manually
4. Check database for transaction records

## ✅ Summary

- ✅ Webhook route created and registered
- ✅ Configuration updated automatically
- ✅ Backend ready to receive payment callbacks
- ⏳ Need to restart backend server
- ⏳ Need to configure A-Pay webhook in dashboard
- ⏳ Test with a real deposit payment

Once you complete these steps, payments will automatically update to "completed" status!
