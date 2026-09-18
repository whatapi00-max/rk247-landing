# RK247 Wallet System - API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "username": "johndoe"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules**:
- Email: Valid email format
- Password: Minimum 8 characters
- Username: 3-50 characters

---

### Login
Authenticate user and get JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Get Current User
Get authenticated user information.

**Endpoint**: `GET /auth/me`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "role": "user",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Wallet Endpoints (User)

### Get Wallet Balance
Get current wallet balance.

**Endpoint**: `GET /wallet/balance`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "balance": 1500.50,
    "currency": "INR"
  }
}
```

---

### Get Transaction History
Get user's transaction history with pagination.

**Endpoint**: `GET /wallet/transactions`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `limit` (optional): Number of transactions (default: 50)
- `offset` (optional): Offset for pagination (default: 0)

**Example**: `/wallet/transactions?limit=20&offset=0`

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "wallet_id": "uuid",
      "type": "deposit",
      "amount": 1000.00,
      "status": "completed",
      "reference_id": "APAY_123456",
      "description": "Deposit via A-Pay",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Transaction Types**:
- `deposit` - Money added to wallet
- `withdrawal` - Money withdrawn
- `trading_id_deduction` - Points deducted for trading ID
- `admin_adjustment` - Manual adjustment by admin

**Transaction Status**:
- `pending` - Transaction initiated
- `completed` - Transaction successful
- `failed` - Transaction failed
- `cancelled` - Transaction cancelled

---

### Initiate Deposit
Start a deposit transaction via A-Pay.

**Endpoint**: `POST /wallet/deposit/initiate`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "amount": 1000
}
```

**Validation**:
- Amount: 100 - 100,000 INR

**Response** (200):
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "transaction_id": "uuid",
    "payment_url": "https://apay.com/pay/xxxxx",
    "apay_transaction_id": "APAY_123456"
  }
}
```

**Flow**:
1. User calls this endpoint
2. Backend creates transaction record
3. Backend calls A-Pay API
4. User is redirected to `payment_url`
5. User completes payment on A-Pay
6. A-Pay sends callback to backend
7. Backend updates wallet balance

---

### Get Deposit Status
Check status of a deposit transaction.

**Endpoint**: `GET /wallet/deposit/status/:transactionId`

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "transaction_id": "uuid",
    "status": "completed",
    "amount": 1000.00,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Payment Callback (Webhook)
A-Pay webhook endpoint (called by A-Pay, not by users).

**Endpoint**: `POST /wallet/deposit/callback`

**Request Body** (from A-Pay):
```json
{
  "transaction_id": "APAY_123456",
  "status": "success",
  "amount": 1000.00,
  "signature": "hash_signature",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Callback processed successfully"
}
```

---

## Admin Endpoints

All admin endpoints require admin role.

### Get All Users
List all users with pagination and search.

**Endpoint**: `GET /admin/users`

**Headers**: `Authorization: Bearer <admin_token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Users per page (default: 20)
- `search` (optional): Search by email or username

**Example**: `/admin/users?page=1&limit=20&search=john`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "user@example.com",
        "username": "johndoe",
        "role": "user",
        "is_active": true,
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

### Get User Wallet Details
Get detailed wallet information for a specific user.

**Endpoint**: `GET /admin/users/:userId/wallet`

**Headers**: `Authorization: Bearer <admin_token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe"
    },
    "wallet": {
      "id": "uuid",
      "user_id": "uuid",
      "balance": 1500.50,
      "currency": "INR",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "recent_transactions": [
      {
        "id": "uuid",
        "type": "deposit",
        "amount": 1000.00,
        "status": "completed",
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### Deduct Points (Trading ID Activation)
Deduct points from user wallet for trading ID activation.

**Endpoint**: `POST /admin/wallet/:walletId/deduct-points`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "amount": 100,
  "description": "Trading ID activation - ID#12345"
}
```

**Validation**:
- Amount: Minimum 1
- Description: Required

**Response** (200):
```json
{
  "success": true,
  "message": "Points deducted successfully",
  "data": {
    "id": "uuid",
    "wallet_id": "uuid",
    "type": "trading_id_deduction",
    "amount": 100.00,
    "status": "completed",
    "description": "Trading ID activation - ID#12345",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error** (500):
```json
{
  "success": false,
  "error": "Insufficient balance"
}
```

---

### Manual Balance Adjustment
Manually adjust user wallet balance (credit or debit).

**Endpoint**: `POST /admin/wallet/:walletId/adjust`

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "amount": 50,
  "type": "credit",
  "description": "Refund for failed transaction"
}
```

**Validation**:
- Amount: Required (positive number)
- Type: `credit` or `debit`
- Description: Required

**Response** (200):
```json
{
  "success": true,
  "message": "Balance adjusted successfully",
  "data": {
    "id": "uuid",
    "wallet_id": "uuid",
    "type": "admin_adjustment",
    "amount": 50.00,
    "status": "completed",
    "description": "Refund for failed transaction",
    "metadata": {
      "adjustment_type": "credit",
      "adjusted_by": "admin_uuid"
    },
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get All Transactions
View all transactions across all users.

**Endpoint**: `GET /admin/transactions`

**Headers**: `Authorization: Bearer <admin_token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Transactions per page (default: 50)
- `type` (optional): Filter by transaction type
- `status` (optional): Filter by status

**Example**: `/admin/transactions?page=1&type=deposit&status=completed`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "wallet_id": "uuid",
        "type": "deposit",
        "amount": 1000.00,
        "status": "completed",
        "created_at": "2024-01-01T00:00:00.000Z",
        "wallets": {
          "user_id": "uuid",
          "users": {
            "email": "user@example.com",
            "username": "johndoe"
          }
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 500,
      "totalPages": 10
    }
  }
}
```

---

### Get Admin Actions Log
View audit log of all admin actions.

**Endpoint**: `GET /admin/admin-actions`

**Headers**: `Authorization: Bearer <admin_token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Actions per page (default: 50)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "actions": [
      {
        "id": "uuid",
        "admin_id": "uuid",
        "action_type": "deduct_points",
        "target_user_id": "uuid",
        "target_wallet_id": "uuid",
        "details": {
          "amount": 100,
          "description": "Trading ID activation",
          "transaction_id": "uuid"
        },
        "created_at": "2024-01-01T00:00:00.000Z",
        "admin": {
          "email": "admin@rk247.com",
          "username": "Admin"
        },
        "target_user": {
          "email": "user@example.com",
          "username": "johndoe"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 200,
      "totalPages": 4
    }
  }
}
```

---

### Get Dashboard Statistics
Get overview statistics for admin dashboard.

**Endpoint**: `GET /admin/dashboard/stats`

**Headers**: `Authorization: Bearer <admin_token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "total_users": 150,
    "total_balance": 125000.50,
    "today_deposits": 15000.00,
    "pending_transactions": 5
  }
}
```

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Route not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limits

- **General endpoints**: 100 requests per 15 minutes
- **Authentication endpoints**: 5 requests per 15 minutes
- **Payment endpoints**: 10 requests per hour

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@12345","username":"testuser"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@12345"}'
```

### Get Balance
```bash
curl -X GET http://localhost:5000/api/wallet/balance \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Initiate Deposit
```bash
curl -X POST http://localhost:5000/api/wallet/deposit/initiate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"amount":1000}'
```

---

## Postman Collection

Import this collection to test all endpoints:
[Download Postman Collection](./postman_collection.json)

---

## WebSocket Support

Currently not implemented. All updates are via REST API polling.

Future enhancement: Real-time balance updates via WebSocket.
