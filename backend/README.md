# RK247 Wallet System Backend

Complete wallet system backend with Node.js, Express, Supabase, and A-Pay payment gateway integration.

## Features

- ✅ User authentication (JWT-based)
- ✅ Wallet management (balance, transactions)
- ✅ A-Pay payment gateway integration
- ✅ Admin dashboard with user management
- ✅ Point deduction for trading IDs
- ✅ Transaction history and audit logs
- ✅ Rate limiting and security features
- ✅ Supabase database integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **Payment Gateway**: A-Pay
- **Validation**: Joi
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# A-Pay (You will provide these)
APAY_API_KEY=your_apay_api_key_here
APAY_SECRET_KEY=your_apay_secret_key_here
APAY_MERCHANT_ID=your_apay_merchant_id_here
APAY_API_URL=https://api.apay.com/v1
APAY_CALLBACK_URL=http://localhost:5000/api/wallet/deposit/callback
APAY_SUCCESS_URL=http://localhost:3000/wallet/success
APAY_FAILURE_URL=http://localhost:3000/wallet/failure

# Frontend
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the schema from `src/migrations/schema.sql`

This will create:
- Users table
- Wallets table
- Transactions table
- A-Pay payments table
- Admin actions log
- Indexes and triggers
- Row-level security policies

### 4. Update Admin Password

After running the schema, update the default admin password:

```sql
-- Generate a bcrypt hash for your password
-- You can use: https://bcrypt-generator.com/

UPDATE users 
SET password = '$2a$10$YOUR_BCRYPT_HASH_HERE'
WHERE email = 'admin@rk247.com';
```

### 5. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Wallet (User)

- `GET /api/wallet/balance` - Get wallet balance
- `GET /api/wallet/transactions` - Get transaction history
- `POST /api/wallet/deposit/initiate` - Initiate deposit via A-Pay
- `POST /api/wallet/deposit/callback` - A-Pay payment callback (webhook)
- `GET /api/wallet/deposit/status/:transactionId` - Check deposit status

### Admin

- `GET /api/admin/users` - List all users (with pagination & search)
- `GET /api/admin/users/:userId/wallet` - Get user wallet details
- `POST /api/admin/wallet/:walletId/deduct-points` - Deduct points for trading ID
- `POST /api/admin/wallet/:walletId/adjust` - Manual balance adjustment
- `GET /api/admin/transactions` - View all transactions
- `GET /api/admin/admin-actions` - View admin action logs
- `GET /api/admin/dashboard/stats` - Dashboard statistics

## A-Pay Integration

### Adding Your A-Pay Keys

Once you have your A-Pay credentials, update the `.env` file:

```env
APAY_API_KEY=your_actual_api_key
APAY_SECRET_KEY=your_actual_secret_key
APAY_MERCHANT_ID=your_actual_merchant_id
APAY_API_URL=https://api.apay.com/v1  # Update with actual A-Pay API URL
```

### Payment Flow

1. User initiates deposit via `/api/wallet/deposit/initiate`
2. Backend creates transaction and calls A-Pay API
3. User is redirected to A-Pay payment page
4. After payment, A-Pay sends callback to `/api/wallet/deposit/callback`
5. Backend verifies signature and updates wallet balance
6. User sees updated balance

### Webhook Configuration

Configure A-Pay webhook URL in your A-Pay dashboard:
```
https://your-domain.com/api/wallet/deposit/callback
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- CORS protection
- Helmet security headers
- Input validation with Joi
- SQL injection prevention (Supabase prepared statements)
- Row-level security in Supabase

## Database Schema

### Users
- id, email, password, username, role, is_active, timestamps

### Wallets
- id, user_id, balance, currency, is_active, timestamps

### Transactions
- id, wallet_id, type, amount, status, reference_id, description, metadata, timestamps

### A-Pay Payments
- id, transaction_id, apay_transaction_id, amount, status, payment_method, payment_url, callback_data, timestamps

### Admin Actions
- id, admin_id, action_type, target_user_id, target_wallet_id, details, created_at

## Admin Features

### Deduct Points for Trading ID

```bash
POST /api/admin/wallet/:walletId/deduct-points
{
  "amount": 100,
  "description": "Trading ID activation - ID#12345"
}
```

### Manual Balance Adjustment

```bash
POST /api/admin/wallet/:walletId/adjust
{
  "amount": 50,
  "type": "credit",  # or "debit"
  "description": "Refund for failed transaction"
}
```

## Logging

Logs are stored in the `logs/` directory:
- `error.log` - Error logs only
- `combined.log` - All logs

## Testing

Test the API health:
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

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secret
- [ ] Configure production database
- [ ] Set up SSL/TLS
- [ ] Configure production A-Pay URLs
- [ ] Set up monitoring (Sentry, DataDog, etc.)
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Set up log rotation

### Recommended Hosting

- **Backend**: Railway, Render, DigitalOcean, AWS
- **Database**: Supabase (managed PostgreSQL)
- **Monitoring**: Sentry for error tracking

## Troubleshooting

### Common Issues

1. **Database connection error**
   - Check Supabase credentials in `.env`
   - Verify Supabase project is active

2. **A-Pay integration not working**
   - Ensure A-Pay credentials are correct
   - Check A-Pay API URL
   - Verify webhook URL is accessible

3. **JWT token errors**
   - Check JWT_SECRET is set
   - Verify token expiration settings

## Support

For issues or questions, contact the development team.

## License

Proprietary - RK247 Trading Platform
