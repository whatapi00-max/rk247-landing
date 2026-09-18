# A-Pay Integration Guide

## 📋 Overview

This guide explains how to integrate A-Pay payment gateway based on their official API documentation at https://api.a-pay.one/

## 🔑 Required Credentials

You need to obtain these from A-Pay:

1. **API Key** (`apikey`) - For API authentication
2. **Access Key** - For webhook signature verification
3. **Private Key** - For webhook signature verification  
4. **Project ID** - Your project identifier in A-Pay system

## ⚙️ Environment Configuration

Update your `backend/.env` file:

```env
# A-Pay Payment Gateway Configuration
APAY_API_KEY=your_api_key_here
APAY_ACCESS_KEY=your_access_key_here
APAY_PRIVATE_KEY=your_private_key_here
APAY_PROJECT_ID=your_project_id_here
APAY_API_URL=https://api.a-pay.one
APAY_CALLBACK_URL=http://localhost:5000/api/wallet/deposit/callback
APAY_RETURN_URL=http://localhost:5173/wallet
```

**For Production:**
```env
APAY_CALLBACK_URL=https://your-api-domain.com/api/wallet/deposit/callback
APAY_RETURN_URL=https://your-domain.com/wallet
```

## 🔄 How It Works

### 1. **Payment Initiation Flow**

```
User clicks "Deposit" 
  ↓
Frontend calls: POST /api/wallet/deposit/initiate
  ↓
Backend creates transaction in database
  ↓
Backend calls A-Pay API: POST /Remotes/create-deposit
  ↓
A-Pay returns payment URL
  ↓
User redirected to A-Pay payment page
  ↓
User completes payment
  ↓
A-Pay sends webhook to your callback URL
  ↓
Backend verifies signature and updates transaction
  ↓
User's wallet balance updated
```

### 2. **API Endpoint Used**

**Create Deposit:**
```
POST https://api.a-pay.one/Remotes/create-deposit?project_id={PROJECT_ID}

Headers:
  apikey: {YOUR_API_KEY}
  Content-Type: application/json

Body:
{
  "amount": 100,
  "currency": "INR",
  "payment_system": "upi_fast",
  "custom_transaction_id": "RK247_xxx",
  "custom_user_id": "user_id",
  "return_url": "https://yoursite.com/wallet",
  "data": {}
}

Response:
{
  "success": true,
  "status": "Pending",
  "order_id": "7fa13dbc3b79e05e",
  "data": {
    "paymentpage_url": "https://payment-url.com"
  }
}
```

### 3. **Webhook Callback**

A-Pay will send a POST request to your `APAY_CALLBACK_URL`:

```json
{
  "access_key": "your_access_key",
  "signature": "generated_signature",
  "transactions": [
    {
      "order_id": "7fa13dbc3b79e05e",
      "status": "Success",
      "amount": 100,
      "currency": "INR",
      "payment_system": "upi_fast",
      "custom_transaction_id": "RK247_xxx",
      "custom_user_id": "user_id",
      "created_at": 1665731710,
      "activated_at": 1665731710
    }
  ]
}
```

**Signature Verification:**
```javascript
// A-Pay signature generation formula:
const transactionsJson = JSON.stringify(transactions);
const md5Hash = crypto.createHash('md5').update(transactionsJson).digest('hex');
const signatureString = access_key + private_key + md5Hash;
const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
```

**Your Response:**
```json
{
  "status": "OK"
}
```

## 📝 Implementation Details

### **Payment Systems Supported**

For India (INR):
- `upi_fast` - UPI Fast (recommended)
- `upi_fast_qr` - UPI QR Code
- `phonepe` - PhonePe
- `paytm` - Paytm
- `upi_p2p` - UPI P2P
- And many more...

### **Currency Support**

INR (Indian Rupee) - Integer amounts only (no decimals)
- Minimum: ₹100
- Maximum: ₹100,000

### **Transaction Statuses**

From A-Pay webhook:
- `Success` - Payment completed successfully
- `Failed` - Payment failed
- `Rejected` - Payment rejected

Mapped to our system:
- `Success` → `completed`
- `Failed` → `failed`
- `Rejected` → `rejected`

## 🧪 Testing

### **1. Test Deposit Flow**

```bash
# Start backend
cd backend
npm run dev

# In another terminal, test deposit
curl -X POST http://localhost:5000/api/wallet/deposit/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"amount": 100}'
```

### **2. Test Webhook (Manual)**

```bash
curl -X POST http://localhost:5000/api/wallet/deposit/callback \
  -H "Content-Type: application/json" \
  -d '{
    "access_key": "your_access_key",
    "signature": "generated_signature",
    "transactions": [{
      "order_id": "test_order_id",
      "status": "Success",
      "amount": 100,
      "currency": "INR",
      "payment_system": "upi_fast",
      "custom_transaction_id": "RK247_test",
      "custom_user_id": "user_id",
      "created_at": 1665731710,
      "activated_at": 1665731710
    }]
  }'
```

## 🔒 Security Considerations

### **1. Webhook Security**

✅ **Always verify signatures** - Never trust webhooks without signature verification
✅ **Use HTTPS in production** - Callback URL must be HTTPS
✅ **Store private keys securely** - Never commit to git
✅ **Validate transaction amounts** - Check amounts match your records
✅ **Idempotency** - Handle duplicate webhooks gracefully

### **2. Environment Variables**

```bash
# NEVER commit these to git
APAY_API_KEY=
APAY_ACCESS_KEY=
APAY_PRIVATE_KEY=
APAY_PROJECT_ID=
```

## 🚀 Deployment Checklist

### **Before Going Live:**

- [ ] Get production A-Pay credentials
- [ ] Update `.env` with production values
- [ ] Set callback URL to production domain (HTTPS)
- [ ] Test webhook signature verification
- [ ] Test full payment flow end-to-end
- [ ] Set up monitoring for failed payments
- [ ] Configure proper error logging
- [ ] Test refund/cancellation flows
- [ ] Document customer support procedures

### **Production Environment Variables:**

```env
APAY_API_KEY=prod_api_key
APAY_ACCESS_KEY=prod_access_key
APAY_PRIVATE_KEY=prod_private_key
APAY_PROJECT_ID=prod_project_id
APAY_API_URL=https://api.a-pay.one
APAY_CALLBACK_URL=https://api.yourdomain.com/api/wallet/deposit/callback
APAY_RETURN_URL=https://yourdomain.com/wallet
```

## 📊 Monitoring

### **Key Metrics to Track:**

1. **Payment Success Rate** - % of successful payments
2. **Average Payment Time** - Time from initiation to completion
3. **Failed Payments** - Track reasons for failures
4. **Webhook Delivery** - Monitor webhook success/failures
5. **Signature Verification Failures** - Security alerts

### **Logging:**

All A-Pay operations are logged in:
- `logs/combined.log` - All logs
- `logs/error.log` - Errors only

## 🐛 Troubleshooting

### **Common Issues:**

**1. "A-Pay credentials not configured"**
- Check `.env` file has all required variables
- Restart backend server after updating `.env`

**2. "Invalid payment signature"**
- Verify `APAY_ACCESS_KEY` and `APAY_PRIVATE_KEY` are correct
- Check webhook payload format matches A-Pay documentation

**3. "Payment initiation failed"**
- Check A-Pay API is accessible
- Verify `APAY_API_KEY` and `APAY_PROJECT_ID` are correct
- Check amount is within limits (₹100 - ₹100,000)

**4. Webhook not received**
- Ensure callback URL is publicly accessible
- Check firewall/security group settings
- Verify HTTPS certificate is valid (production)
- Check A-Pay dashboard for webhook delivery logs

## 📞 Support

### **A-Pay Support:**
- Documentation: https://api.a-pay.one/
- Contact your A-Pay account manager for:
  - API credentials
  - Webhook setup
  - Payment system configuration
  - Technical support

### **Our Implementation:**
- Backend service: `backend/src/services/apayService.js`
- Wallet routes: `backend/src/routes/wallet.js`
- Database schema: `backend/src/migrations/schema.sql`

## 🎯 Next Steps

1. **Contact A-Pay** to get your credentials
2. **Update `.env`** with your credentials
3. **Test locally** with small amounts
4. **Verify webhooks** are working correctly
5. **Deploy to production** with HTTPS
6. **Monitor** payment flows closely

---

**Ready to integrate!** Once you have your A-Pay credentials, just update the `.env` file and restart the backend server. 🚀
