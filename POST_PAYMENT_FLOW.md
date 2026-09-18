# 📊 What Happens After Payment

## 🎯 Complete Post-Payment Flow

### **Step 1: User Completes Payment on A-Pay**
- User is on A-Pay payment page: `https://dazen1.one/pay/ur?token=...`
- User enters their Raast account details
- User completes the payment
- A-Pay processes the payment

### **Step 2: A-Pay Sends Webhook to Your Backend**
After payment is confirmed, A-Pay sends a webhook POST request to:
```
http://localhost:5000/api/wallet/deposit/callback
```

**Webhook Payload:**
```json
{
  "access_key": "45477c9efd2df0b15da0e00c6da2083a",
  "signature": "generated_signature",
  "transactions": [
    {
      "order_id": "6a7b3eaae60f635b",
      "status": "Success",
      "amount": 100,
      "currency": "PKR",
      "payment_system": "raast_p2p",
      "custom_transaction_id": "RK247_xxx",
      "custom_user_id": "user_id",
      "created_at": 1691234567,
      "activated_at": 1691234570
    }
  ]
}
```

### **Step 3: Backend Verifies Webhook Signature**
The backend (`apayService.js`) verifies the webhook:

```javascript
// Verify signature using:
// signature = sha1(access_key + private_key + md5(transactions_json))

const expectedSignature = this.generateWebhookSignature(transactions);
if (signature !== expectedSignature) {
  throw new Error('Invalid payment signature');
}
```

**Security Check:** ✅ Ensures webhook is from A-Pay, not a hacker

### **Step 4: Backend Updates Transaction Status**
Once signature is verified, the backend:

1. **Finds the transaction** in database by `order_id`
2. **Updates status** from "pending" to "completed"
3. **Stores webhook data** for audit trail

```javascript
await supabase
  .from('apay_payments')
  .update({
    status: 'completed',
    callback_data: transaction,
    updated_at: new Date().toISOString()
  })
  .eq('apay_transaction_id', transaction.order_id);
```

### **Step 5: Backend Updates User's Wallet Balance**
The backend automatically updates the wallet:

```javascript
// Add amount to user's wallet
const newBalance = currentBalance + amount;

await supabase
  .from('wallets')
  .update({ balance: newBalance })
  .eq('user_id', userId);
```

**Result:** User's balance increases by PKR 100 ✅

### **Step 6: Backend Responds to A-Pay**
Backend sends confirmation back to A-Pay:

```json
{
  "status": "OK"
}
```

**This tells A-Pay:** "I received and processed the webhook successfully"

### **Step 7: User Returns to Wallet**
After payment, A-Pay redirects user back to:
```
http://localhost:5173/wallet?status=Created
```

**Status Parameters:**
- `Created` - Payment created but not completed
- `Success` - Payment successful
- `Cancel` - User cancelled payment
- `Fail` - Payment failed

### **Step 8: Frontend Refreshes Balance**
When user returns to wallet page:
1. Frontend loads balance from backend
2. Shows updated balance (original + PKR 100)
3. Shows transaction in history as "Completed"

---

## 📱 User Experience Timeline

```
Time    Event                          User Sees
────────────────────────────────────────────────────────
0:00    Clicks "Proceed to Payment"    Loading...
0:05    Redirected to A-Pay            A-Pay payment page
1:00    Completes payment              "Processing..."
1:05    A-Pay processes                "Redirecting..."
1:10    Webhook sent to backend        (invisible)
1:15    Balance updated in DB          (invisible)
1:20    Redirected back to wallet      ✅ Balance updated!
1:25    Sees new balance               PKR 100 added
1:30    Sees transaction in history    "Completed"
```

---

## 🔄 Database Updates

### **Before Payment:**
```
Wallets Table:
- user_id: xxx
- balance: 0
- updated_at: 2026-08-11

Transactions Table:
- id: yyy
- wallet_id: xxx
- type: deposit
- amount: 100
- status: pending
- created_at: 2026-08-11

A-Pay Payments Table:
- transaction_id: yyy
- apay_transaction_id: 6a7b3eaae60f635b
- amount: 100
- status: pending
- callback_data: null
```

### **After Payment (Webhook Received):**
```
Wallets Table:
- user_id: xxx
- balance: 100  ✅ UPDATED
- updated_at: 2026-08-11 15:25:00

Transactions Table:
- id: yyy
- wallet_id: xxx
- type: deposit
- amount: 100
- status: completed  ✅ UPDATED
- created_at: 2026-08-11

A-Pay Payments Table:
- transaction_id: yyy
- apay_transaction_id: 6a7b3eaae60f635b
- amount: 100
- status: completed  ✅ UPDATED
- callback_data: {webhook_data}  ✅ STORED
```

---

## ✅ What Gets Updated

### **User's Wallet:**
- ✅ Balance increases by PKR 100
- ✅ Updated timestamp recorded
- ✅ Visible in wallet dashboard

### **Transaction Record:**
- ✅ Status changes to "completed"
- ✅ Visible in transaction history
- ✅ Shows in admin dashboard

### **A-Pay Payment Record:**
- ✅ Status changes to "completed"
- ✅ Webhook data stored for audit
- ✅ Timestamp recorded

### **Admin Audit Log:**
- ✅ Payment completion logged
- ✅ Amount recorded
- ✅ User recorded
- ✅ Timestamp recorded

---

## 🔒 Security Features

### **Webhook Verification:**
✅ Signature verification (SHA1 + MD5)  
✅ Access key validation  
✅ Transaction amount validation  
✅ Idempotency (duplicate webhooks handled)  

### **Data Protection:**
✅ All data encrypted in transit (HTTPS)  
✅ Webhook data stored in database  
✅ Audit trail maintained  
✅ User data isolated with RLS policies  

---

## 📊 Admin Dashboard Updates

After payment, admins can see:

1. **Dashboard Stats:**
   - Total users: +1 (if new user)
   - Total balance: +PKR 100
   - Today's deposits: +PKR 100
   - Pending transactions: -1

2. **User Details:**
   - User balance: PKR 100
   - Last transaction: Deposit (Completed)
   - Transaction history: Shows deposit

3. **Transaction List:**
   - New entry: Deposit, PKR 100, Completed
   - Timestamp: Payment completion time
   - Payment system: Raast P2P

---

## 🎯 What If Payment Fails?

### **Scenario 1: User Cancels Payment**
- A-Pay sends webhook with status: `Cancel`
- Backend updates transaction to "failed"
- Balance NOT updated
- User sees "Payment cancelled" message

### **Scenario 2: Payment Fails**
- A-Pay sends webhook with status: `Failed`
- Backend updates transaction to "failed"
- Balance NOT updated
- User can retry

### **Scenario 3: Webhook Not Received**
- User can check status manually
- Admin can see pending transaction
- User can contact support

---

## 📱 User's View After Payment

### **Wallet Page Shows:**
```
┌─────────────────────────────────┐
│  Your Wallet                    │
├─────────────────────────────────┤
│                                 │
│  Balance: PKR 100 ✅ UPDATED    │
│                                 │
│  Recent Transactions:           │
│  ┌─────────────────────────────┐│
│  │ Deposit                     ││
│  │ PKR 100                     ││
│  │ Status: Completed ✅        ││
│  │ Time: 2026-08-11 15:25:00  ││
│  └─────────────────────────────┘│
│                                 │
│  [Deposit Funds]                │
└─────────────────────────────────┘
```

---

## 🔄 Complete Timeline

```
User Action          Backend Action           Database Update
─────────────────────────────────────────────────────────────
1. Click Deposit     Create transaction       Transaction: pending
2. Enter amount      Call A-Pay API           A-Pay payment: pending
3. Proceed           Get payment URL          -
4. Redirect          -                        -
5. Complete payment  -                        -
6. A-Pay webhook     Verify signature         Transaction: completed
7. Update balance    Update wallet            Wallet: +100
8. Return to app     -                        -
9. See balance       Fetch from DB            Display: 100
```

---

## ✅ Success Indicators

After payment, you'll see:

✅ **Balance Updated** - Shows PKR 100  
✅ **Transaction Status** - Shows "Completed"  
✅ **Timestamp** - Shows payment time  
✅ **Payment System** - Shows "Raast P2P"  
✅ **Admin Dashboard** - Shows updated stats  

---

## 🚀 What's Automatic

Everything happens automatically:

✅ Webhook verification  
✅ Balance update  
✅ Transaction status update  
✅ Audit logging  
✅ Admin dashboard refresh  
✅ User dashboard refresh  

**No manual intervention needed!** 🎉

---

## 📞 Support

If payment doesn't update:

1. **Check webhook logs** - Backend logs show webhook received
2. **Check database** - Verify transaction status
3. **Check admin panel** - See if balance updated
4. **Contact A-Pay** - If webhook not received

---

**Summary:** After payment, everything updates automatically! User sees their balance increase, transaction shows as completed, and admin can see the activity. 🎊

---

**Status:** ✅ FULLY AUTOMATED  
**Date:** August 11, 2026
