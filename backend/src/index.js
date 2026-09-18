import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import walletRoutes from './routes/wallet.js';
import withdrawalRoutes from './routes/withdrawal.js';
import adminRoutes from './routes/admin.js';
import webhookRoutes, { handleApayCallback } from './routes/webhook.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import logger from './config/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the first proxy hop (needed to read the real client IP from
// X-Forwarded-For when deployed behind a reverse proxy/load balancer)
app.set('trust proxy', 1);

const logsDir = join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(generalLimiter);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'RK247 Wallet API'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/withdrawal', withdrawalRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/webhook', webhookRoutes);

// A-Pay sends callbacks to whatever URL is configured in their merchant panel.
// If that URL doesn't include our full route path (e.g. just the domain root),
// the callback lands here — detect A-Pay-shaped bodies and handle them anyway.
app.post(['/', '/callback', '/api/callback'], (req, res, next) => {
  if (req.body && req.body.access_key && req.body.transactions) {
    return handleApayCallback(req, res);
  }
  next();
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found' 
  });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 RK247 Wallet API server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
});

export default app;
