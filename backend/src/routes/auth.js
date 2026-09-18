import express from 'express';
import authService from '../services/authService.js';
import { validate, schemas } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import supabase from '../config/database.js';
import logger from '../config/logger.js';
import { getClientIp, lookupIpInfo } from '../services/geoService.js';

const router = express.Router();

router.post('/register', authLimiter, validate(schemas.register), async (req, res) => {
  try {
    const { email, password, username, phone } = req.body;
    const result = await authService.register(email, password, username, phone);
    
    logger.info(`New user registered: ${email}`);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/login', authLimiter, validate(schemas.login), async (req, res) => {
  try {
    const identifier = req.body.identifier || req.body.email;
    const { password } = req.body;
    const result = await authService.login(identifier, password);

    // Admin accounts must use the dedicated admin login — keep the two sides separate
    if (result.user.role === 'admin') {
      logger.warn(`Admin account attempted to log in via the user login endpoint: ${identifier}`);
      return res.status(403).json({
        success: false,
        error: 'Admin accounts must sign in from the Admin Panel.',
        code: 'ADMIN_USE_ADMIN_LOGIN'
      });
    }

    logger.info(`User logged in: ${identifier}`);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/admin/login', authLimiter, validate(schemas.login), async (req, res) => {
  try {
    const identifier = req.body.identifier || req.body.email;
    const { password } = req.body;
    const result = await authService.login(identifier, password);
    
    // Verify user has admin role
    if (result.user.role !== 'admin') {
      logger.warn(`Non-admin user attempted admin login: ${identifier}`);
      return res.status(403).json({
        success: false,
        error: 'Access denied. Admin privileges required.'
      });
    }
    
    logger.info(`Admin logged in: ${identifier}`);

    // Record login IP/location for security auditing (never blocks the login response)
    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'] || null;
    lookupIpInfo(ip)
      .then((geo) =>
        supabase.from('admin_login_history').insert({
          admin_id: result.user.id,
          ip_address: geo.ip,
          user_agent: userAgent,
          city: geo.city,
          region: geo.region,
          country: geo.country,
          isp: geo.isp
        })
      )
      .then(({ error: logError }) => {
        if (logError) logger.warn('Failed to record admin login history (run add_admin_login_history.sql?):', logError.message || logError);
      })
      .catch((err) => logger.warn('Admin login history logging failed:', err.message));

    res.json({
      success: true,
      message: 'Admin login successful',
      data: result
    });
  } catch (error) {
    logger.error('Admin login error:', error);
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user data'
    });
  }
});

router.post('/change-password-forced', authenticate, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long'
      });
    }

    // Validate strong password
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      return res.status(400).json({
        success: false,
        error: 'Password must contain uppercase, lowercase, number, and special character'
      });
    }

    // Hash the new password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(newPassword, 10);

    // Update user password and remove force_password_change flag
    let { error: updateError } = await supabase
      .from('users')
      .update({ 
        password: hashedPassword,
        force_password_change: false
      })
      .eq('id', req.user.id);

    // Older schemas may lack the force_password_change column — retry without it
    if (updateError?.code === 'PGRST204') {
      logger.warn('users.force_password_change column missing — run add_force_password_change.sql migration');
      ({ error: updateError } = await supabase
        .from('users')
        .update({ password: hashedPassword })
        .eq('id', req.user.id));
    }

    if (updateError) throw updateError;

    logger.info(`User ${req.user.id} changed password after admin reset`);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to change password'
    });
  }
});

export default router;
