# Wallet System Implementation Plan

## Project Overview
Implementing a comprehensive wallet system for the RK247 trading platform with user wallet management, payment gateway integration (A-Pay), admin controls, and trading ID creation with point deduction.

---

## System Architecture

### 1. **Core Components**

#### 1.1 User Wallet Module
- **Wallet Balance Management**
  - Store user wallet balance in database
  - Track wallet history/transactions
  - Real-time balance updates

- **Wallet Operations**
  - View wallet balance
  - Deposit money (via A-Pay gateway)
  - Withdraw money
  - Transaction history

#### 1.2 Payment Gateway Integration (A-Pay)
- **Integration Points**
  - A-Pay API authentication
  - Payment initiation
  - Payment verification/callback handling
  - Error handling and retry logic

- **Payment Flow**
  - User initiates deposit
  - Redirect to A-Pay payment page
  - A-Pay processes payment
  - Callback to verify payment
  - Update wallet balance on success

#### 1.3 Admin Dashboard
- **Admin Features**
  - View all users and their wallets
  - Deduct points from user wallets (for trading ID activation)
  - View transaction logs
  - Manage wallet operations (manual adjustments if needed)

---

## Database Schema

### Users Table
```
users
├── id (UUID)
├── email (string, unique)
├── password (hashed)
├── username (string)
├── created_at (timestamp)
├── updated_at (timestamp)
└── role (enum: 'user' | 'admin')
```

### Wallets Table
```
wallets
├── id (UUID)
├── user_id (FK → users.id)
├── balance (decimal)
├── currency (string, default: 'USD')
├── created_at (timestamp)
├── updated_at (timestamp)
└── is_active (boolean)
```

### Transactions Table
```
transactions
├── id (UUID)
├── wallet_id (FK → wallets.id)
├── type (enum: 'deposit' | 'withdrawal' | 'trading_id_deduction' | 'admin_adjustment')
├── amount (decimal)
├── status (enum: 'pending' | 'completed' | 'failed')
├── reference_id (string) // A-Pay transaction ID
├── description (string)
├── created_at (timestamp)
└── updated_at (timestamp)
```



### A-Pay Payments Table
```
apay_payments
├── id (UUID)
├── transaction_id (FK → transactions.id)
├── apay_transaction_id (string, unique)
├── amount (decimal)
├── status (enum: 'pending' | 'completed' | 'failed')
├── payment_method (string)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## Implementation Phases

**Total Estimated Duration: 5-6 weeks** (simplified from 7-8 weeks)

### Phase 1: Backend Setup (Foundation)
**Duration: 1-2 weeks**

#### 1.1 Database Setup
- [ ] Create database schema (PostgreSQL/MongoDB)
- [ ] Set up migrations
- [ ] Create indexes for performance

#### 1.2 Authentication & Authorization
- [ ] Implement user authentication (JWT/Session)
- [ ] Create role-based access control (RBAC)
- [ ] Admin role verification middleware

#### 1.3 Wallet Service
- [ ] Create wallet creation on user signup
- [ ] Implement balance retrieval
- [ ] Create transaction logging system
- [ ] Build wallet history API

#### 1.4 API Endpoints (Initial)
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/wallet/balance
GET    /api/wallet/transactions
POST   /api/wallet/deposit (initiate)
```

---

### Phase 2: Payment Gateway Integration
**Duration: 1-2 weeks**

#### 2.1 A-Pay Integration
- [ ] Register with A-Pay and get API credentials
- [ ] Implement A-Pay SDK/API client
- [ ] Create payment initiation endpoint
- [ ] Implement webhook for payment callbacks
- [ ] Add payment verification logic

#### 2.2 Payment Flow Implementation
- [ ] Create deposit initiation page
- [ ] Implement A-Pay redirect flow
- [ ] Handle payment success/failure callbacks
- [ ] Update wallet balance on successful payment
- [ ] Add error handling and retry logic

#### 2.3 API Endpoints (Payment)
```
POST   /api/wallet/deposit/initiate
POST   /api/wallet/deposit/callback (webhook)
GET    /api/wallet/deposit/status/:transactionId
POST   /api/wallet/withdraw
```

---

### Phase 3: Admin Dashboard Backend
**Duration: 1 week**

#### 3.1 Admin APIs
- [ ] User management endpoints
- [ ] Wallet viewing endpoints
- [ ] Transaction history endpoints
- [ ] Point deduction endpoint (for trading ID activation)
- [ ] Admin audit logging

#### 3.2 API Endpoints (Admin)
```
GET    /api/admin/users
GET    /api/admin/users/:userId/wallet
GET    /api/admin/transactions
POST   /api/admin/wallet/:walletId/deduct-points
POST   /api/admin/wallet/:walletId/adjust
```

**Note**: Trading IDs are created and managed manually via external software. The system only handles point deduction when admin activates a trading ID.

---

### Phase 4: Frontend - User Wallet Interface
**Duration: 1-2 weeks**

#### 4.1 User Wallet Pages
- [ ] Wallet dashboard page
- [ ] Deposit page (with A-Pay integration)
- [ ] Withdrawal request page
- [ ] Transaction history page

#### 4.2 Components
- [ ] Wallet balance display
- [ ] Deposit form
- [ ] Transaction list
- [ ] Payment status indicator

#### 4.3 Features
- [ ] Real-time balance updates
- [ ] Transaction filtering/search
- [ ] Payment status notifications
- [ ] Error handling and user feedback

---

### Phase 5: Frontend - Admin Dashboard
**Duration: 1 week**

#### 5.1 Admin Pages
- [ ] Admin dashboard (overview)
- [ ] User management page
- [ ] User wallet details page
- [ ] Transaction logs page

#### 5.2 Components
- [ ] User list with search/filter
- [ ] Wallet details view
- [ ] Point deduction interface
- [ ] Transaction history table

#### 5.3 Features
- [ ] User search and filtering
- [ ] Quick point deduction for trading ID activation
- [ ] Audit logging display
- [ ] Admin action confirmations

---

### Phase 6: Security & Testing
**Duration: 1 week**

#### 6.1 Security Implementation
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] Secure password hashing
- [ ] API authentication/authorization
- [ ] Sensitive data encryption

#### 6.2 Testing
- [ ] Unit tests for wallet operations
- [ ] Integration tests for payment flow
- [ ] API endpoint tests
- [ ] Admin functionality tests
- [ ] Security testing

#### 6.3 Compliance
- [ ] PCI DSS compliance (if handling cards)
- [ ] Data protection regulations
- [ ] Transaction logging for audits

---

### Phase 7: Deployment & Monitoring
**Duration: 1 week**

#### 7.1 Deployment
- [ ] Set up production environment
- [ ] Configure environment variables
- [ ] Database migration to production
- [ ] SSL/TLS setup

#### 7.2 Monitoring & Logging
- [ ] Application logging
- [ ] Error tracking (Sentry/similar)
- [ ] Performance monitoring
- [ ] Transaction logging

---

## Technology Stack Recommendations

### Backend
- **Framework**: Node.js (Express/Fastify) or Python (Django/FastAPI)
- **Database**: PostgreSQL (recommended for financial transactions)
- **Authentication**: JWT + bcrypt
- **Payment Gateway**: A-Pay API
- **Caching**: Redis (for session/balance caching)

### Frontend
- **Framework**: Continue with existing Vite + TypeScript setup
- **State Management**: Consider adding (Redux/Zustand/Pinia)
- **HTTP Client**: Axios/Fetch API
- **UI Components**: Tailwind CSS (already in use)

### DevOps
- **Hosting**: Vercel (frontend), AWS/DigitalOcean (backend)
- **Database**: Managed PostgreSQL (AWS RDS/DigitalOcean)
- **Monitoring**: Sentry, DataDog, or similar

---

## Key Considerations

### 1. **Security**
- Never expose A-Pay credentials in frontend
- Validate all transactions server-side
- Implement proper rate limiting
- Use HTTPS everywhere
- Encrypt sensitive data

### 2. **Scalability**
- Use database indexing for frequently queried fields
- Implement caching for wallet balances
- Queue payment processing for reliability
- Plan for horizontal scaling

### 3. **User Experience**
- Clear transaction history
- Real-time balance updates
- Clear error messages
- Payment status notifications
- Mobile-responsive design

### 4. **Admin Experience**
- Easy user search and filtering
- Quick point deduction interface
- Clear audit trails
- Dashboard analytics
- Integration with external trading ID management system

### 5. **Compliance & Audit**
- Log all financial transactions
- Maintain audit trails for admin actions
- Implement proper access controls
- Regular security audits
- Data backup and recovery

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Payment gateway downtime | Implement retry logic, queue system, fallback notifications |
| Unauthorized access | Strong authentication, RBAC, rate limiting, IP whitelisting |
| Data loss | Regular backups, database replication, disaster recovery plan |
| Fraud | Transaction verification, admin approval workflows, anomaly detection |
| Compliance issues | Regular audits, proper logging, legal review |

---

## Success Metrics

- [ ] Users can successfully deposit funds via A-Pay
- [ ] Admin can quickly deduct points from user wallets
- [ ] All transactions are properly logged
- [ ] System handles 1000+ concurrent users
- [ ] 99.9% uptime for payment processing
- [ ] Zero unauthorized access incidents
- [ ] User satisfaction > 95%
- [ ] Seamless integration with external trading ID management

---

## Next Steps

1. **Approval**: Review and approve this plan
2. **Backend Setup**: Start with database schema and API foundation
3. **A-Pay Integration**: Get API credentials and test integration
4. **Frontend Preparation**: Plan UI/UX for wallet features
5. **Testing**: Develop comprehensive test suite
6. **Deployment**: Set up staging and production environments

---

## Workflow Summary

```
User Deposits Money:
1. User initiates deposit on wallet page
2. System redirects to A-Pay payment gateway
3. A-Pay processes payment
4. A-Pay sends callback to verify payment
5. System updates user wallet balance
6. User sees updated balance

Admin Activates Trading ID:
1. Admin creates trading ID in external software
2. Admin logs into admin dashboard
3. Admin finds user and deducts points from wallet
4. System logs the transaction
5. User's wallet balance is reduced
6. Trading ID is now active (managed externally)
```

---

## Notes

- This plan assumes a traditional web application architecture
- Trading ID creation is handled completely outside this system
- Adjust timelines based on team size and experience
- Consider hiring a security consultant for financial systems
- Implement proper error handling and logging from the start
- Keep documentation updated as implementation progresses
- The system focuses on wallet management and point deduction only
