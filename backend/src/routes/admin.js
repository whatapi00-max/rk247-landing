import express from 'express';
import walletService from '../services/walletService.js';
import withdrawalService from '../services/withdrawalService.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import supabase from '../config/database.js';
import logger from '../config/logger.js';

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);

router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;
    const isActiveFilter = typeof req.query.is_active !== 'undefined'
      ? req.query.is_active === 'true'
      : undefined;

    let query = supabase
      .from('users')
      .select('id, email, username, role, is_active, phone, created_at, wallets(balance, currency)');

    if (search) {
      query = query.or(`email.ilike.%${search}%,username.ilike.%${search}%`);
    }

    if (typeof isActiveFilter === 'boolean') {
      query = query.eq('is_active', isActiveFilter);
    }

    const { data: users, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Flatten the embedded wallet into a simple balance field
    const usersWithBalance = (users || []).map(({ wallets, ...user }) => {
      const wallet = Array.isArray(wallets) ? wallets[0] : wallets;
      return { ...user, balance: wallet?.balance ?? null };
    });

    // Separate count query for reliable pagination
    let countQuery = supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (search) {
      countQuery = countQuery.or(`email.ilike.%${search}%,username.ilike.%${search}%`);
    }

    if (typeof isActiveFilter === 'boolean') {
      countQuery = countQuery.eq('is_active', isActiveFilter);
    }

    const { count, error: countError } = await countQuery;
    if (countError) throw countError;

    const totalCount = typeof count === 'number' ? count : 0;

    res.json({
      success: true,
      data: {
        users: usersWithBalance,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

router.get('/users/:userId/wallet', async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, username')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const wallet = await walletService.getWalletByUserId(userId);
    
    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('transactions')
      .select('id', { count: 'exact', head: true })
      .eq('wallet_id', wallet.id);

    const { transactions, pagination: txPagination } = await walletService.getTransactionHistory(userId, limit, offset);

    res.json({
      success: true,
      data: {
        user,
        wallet,
        transactions,
        pagination: {
          ...txPagination,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get user wallet error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch wallet details'
    });
  }
});

router.post('/wallet/:walletId/deduct-points', validate(schemas.deductPoints), async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;

    const transaction = await walletService.deductPoints(
      walletId,
      amount,
      description,
      req.user.id
    );

    logger.info(`Admin ${req.user.id} deducted ${amount} points from wallet ${walletId}`);

    res.json({
      success: true,
      message: 'Points deducted successfully',
      data: transaction
    });
  } catch (error) {
    logger.error('Deduct points error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/wallet/:walletId/adjust', validate(schemas.adminAdjustment), async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, type, description } = req.body;

    const transaction = await walletService.adminAdjustBalance(
      walletId,
      amount,
      type,
      description,
      req.user.id
    );

    logger.info(`Admin ${req.user.id} adjusted wallet ${walletId} by ${amount} (${type})`);

    res.json({
      success: true,
      message: 'Balance adjusted successfully',
      data: transaction
    });
  } catch (error) {
    logger.error('Adjust balance error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const type = req.query.type;
    const status = req.query.status;
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('transactions')
      .select(`
        *,
        wallets!inner(
          user_id,
          users!inner(email, username, id)
        ),
        apay_payments!left(
          apay_transaction_id,
          order_id,
          payment_url,
          payment_method,
          status,
          callback_data
        )
      `);

    if (type) {
      query = query.eq('type', type);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    let { data: transactions, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Fallback if apay_payments.order_id column does not exist yet
    if (error && error.code === '42703' && (error.message || '').includes('order_id')) {
      query = supabase
        .from('transactions')
        .select(`
          *,
          wallets!inner(
            user_id,
            users!inner(email, username, id)
          ),
          apay_payments!left(
            apay_transaction_id,
            payment_url,
            payment_method,
            status,
            callback_data
          )
        `);

      if (type) query = query.eq('type', type);
      if (status) query = query.eq('status', status);
      if (startDate) query = query.gte('created_at', startDate);
      if (endDate) query = query.lte('created_at', endDate);

      const fallback = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (fallback.error) throw fallback.error;
      transactions = fallback.data;
    } else if (error) {
      throw error;
    }

    // Separate count query for reliable pagination
    let countQuery = supabase
      .from('transactions')
      .select('id', { count: 'exact', head: true });

    if (type) countQuery = countQuery.eq('type', type);
    if (status) countQuery = countQuery.eq('status', status);
    if (startDate) countQuery = countQuery.gte('created_at', startDate);
    if (endDate) countQuery = countQuery.lte('created_at', endDate);

    const { count, error: countError } = await countQuery;
    if (countError) throw countError;

    const totalCount = typeof count === 'number' ? count : 0;

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions'
    });
  }
});

router.get('/admin-actions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const { data: actions, error } = await supabase
      .from('admin_actions')
      .select(`
        *,
        admin:admin_id(email, username),
        target_user:target_user_id(email, username)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Separate count query for reliable pagination
    const { count, error: countError } = await supabase
      .from('admin_actions')
      .select('id', { count: 'exact', head: true });

    if (countError) throw countError;

    const totalCount = typeof count === 'number' ? count : 0;

    res.json({
      success: true,
      data: {
        actions,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get admin actions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin actions'
    });
  }
});

router.get('/login-history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { data: logins, error } = await supabase
      .from('admin_login_history')
      .select(`
        *,
        admin:admin_id(email, username)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return res.status(503).json({
          success: false,
          error: 'Admin login history table not found. Please run the add_admin_login_history.sql migration.',
          code: 'MIGRATION_REQUIRED'
        });
      }
      throw error;
    }

    const { count, error: countError } = await supabase
      .from('admin_login_history')
      .select('id', { count: 'exact', head: true });

    if (countError) throw countError;

    const totalCount = typeof count === 'number' ? count : 0;

    res.json({
      success: true,
      data: {
        logins,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get admin login history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin login history'
    });
  }
});

router.get('/dashboard/stats', async (req, res) => {
  try {
    // Run all independent queries in parallel
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();

    const [
      { count: totalUsers },
      { data: totalWallets },
      { data: todayDeposits },
      { count: pendingTransactions },
      { count: pendingWithdrawals },
      { data: todayWithdrawals }
    ] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('wallets').select('balance'),
      supabase.from('transactions').select('amount').eq('type', 'deposit').eq('status', 'completed').gte('created_at', todayStart),
      supabase.from('transactions').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('withdrawals').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('withdrawals').select('amount').eq('status', 'approved').gte('created_at', todayStart)
    ]);

    const totalBalance = totalWallets?.reduce((sum, w) => sum + (parseFloat(w.balance) || 0), 0) || 0;
    const todayDepositsTotal = todayDeposits?.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0) || 0;
    const todayWithdrawalsTotal = todayWithdrawals?.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0) || 0;

    res.json({
      success: true,
      data: {
        total_users: totalUsers || 0,
        total_balance: totalBalance,
        today_deposits: todayDepositsTotal,
        pending_transactions: pendingTransactions || 0,
        pending_withdrawals: pendingWithdrawals || 0,
        today_withdrawals: todayWithdrawalsTotal,
        currency: 'PKR'
      }
    });
  } catch (error) {
    logger.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard stats'
    });
  }
});

router.get('/withdrawals', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('withdrawals')
      .select(`
        *,
        wallets!inner(
          user_id,
          users!inner(email, username)
        )
      `);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: withdrawals, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      // Check if the withdrawals table is missing
      if (error.code === 'PGRST205' || error.message?.includes('withdrawals')) {
        logger.error('Withdrawals table not found. Please run migrations.');
        return res.status(503).json({
          success: false,
          error: 'Withdrawals table not found. Please run the database migrations.',
          code: 'MIGRATION_REQUIRED'
        });
      }
      throw error;
    }

    // Separate count query for reliable pagination
    let countQuery = supabase
      .from('withdrawals')
      .select('id', { count: 'exact', head: true });

    if (status) countQuery = countQuery.eq('status', status);

    const { count, error: countError } = await countQuery;
    if (countError) throw countError;

    const totalCount = typeof count === 'number' ? count : 0;

    res.json({
      success: true,
      data: {
        withdrawals,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Get withdrawals error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawals'
    });
  }
});

router.post('/withdrawals/:withdrawalId/approve', async (req, res) => {
  try {
    const { withdrawalId } = req.params;

    // Use withdrawal service to approve
    const withdrawal = await withdrawalService.approveWithdrawal(withdrawalId, req.user.id);

    logger.info(`Admin ${req.user.id} approved withdrawal ${withdrawalId}`);

    res.json({
      success: true,
      message: 'Withdrawal approved successfully',
      data: withdrawal
    });
  } catch (error) {
    logger.error('Approve withdrawal error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/withdrawals/:withdrawalId/reject', async (req, res) => {
  try {
    const { withdrawalId } = req.params;
    const { reason } = req.body;

    // Use withdrawal service to reject
    const withdrawal = await withdrawalService.rejectWithdrawal(withdrawalId, reason || 'Rejected by admin', req.user.id);

    logger.info(`Admin ${req.user.id} rejected withdrawal ${withdrawalId}`);

    res.json({
      success: true,
      message: 'Withdrawal rejected successfully',
      data: withdrawal
    });
  } catch (error) {
    logger.error('Reject withdrawal error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/users/:userId/reset-password', async (req, res) => {
  try {
    const { userId } = req.params;
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

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, username, role')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Password reset is not allowed for admin accounts'
      });
    }

    // Hash the new password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(newPassword, 10);

    // Update user password and set force_password_change flag
    let { error: updateError } = await supabase
      .from('users')
      .update({ 
        password: hashedPassword,
        force_password_change: true
      })
      .eq('id', userId);

    // Older schemas may lack the force_password_change column — retry without it
    if (updateError?.code === 'PGRST204') {
      logger.warn('users.force_password_change column missing — run add_force_password_change.sql migration');
      ({ error: updateError } = await supabase
        .from('users')
        .update({ password: hashedPassword })
        .eq('id', userId));
    }

    if (updateError) throw updateError;

    // Log admin action
    const { error: logError } = await supabase
      .from('admin_actions')
      .insert({
        admin_id: req.user.id,
        action_type: 'password_reset',
        target_user_id: userId,
        details: { description: `Password reset for user ${user.email}` }
      });
    if (logError) logger.error('Failed to record admin action (password_reset):', logError);

    logger.info(`Admin ${req.user.id} reset password for user ${userId}`);

    res.json({
      success: true,
      message: 'Password reset successfully',
      data: {
        userId: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    logger.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset password'
    });
  }
});

router.post('/users/:userId/toggle-status', async (req, res) => {
  try {
    const { userId } = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'is_active must be a boolean'
      });
    }

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, is_active')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update user status
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_active })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Log admin action
    const { error: logError } = await supabase
      .from('admin_actions')
      .insert({
        admin_id: req.user.id,
        action_type: is_active ? 'activate_user' : 'deactivate_user',
        target_user_id: userId,
        details: { description: `${is_active ? 'Activated' : 'Deactivated'} user ${user.email}` }
      });
    if (logError) logger.error('Failed to record admin action (toggle_status):', logError);

    logger.info(`Admin ${req.user.id} ${is_active ? 'activated' : 'deactivated'} user ${userId}`);

    res.json({
      success: true,
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    logger.error('Toggle user status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle user status'
    });
  }
});

router.post('/users/create', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email, username, and password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Hash password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(password, 10);

    // Create user with force_password_change flag
    let { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        email,
        username,
        password: hashedPassword,
        role: 'user',
        is_active: true,
        force_password_change: true
      })
      .select('id, email, username')
      .single();

    // Older schemas may lack the force_password_change column — retry without it
    if (createError?.code === 'PGRST204') {
      logger.warn('users.force_password_change column missing — run add_force_password_change.sql migration');
      ({ data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          username,
          password: hashedPassword,
          role: 'user',
          is_active: true
        })
        .select('id, email, username')
        .single());
    }

    if (createError) throw createError;

    // Log admin action
    const { error: logError } = await supabase
      .from('admin_actions')
      .insert({
        admin_id: req.user.id,
        action_type: 'create_user',
        target_user_id: newUser.id,
        details: { description: `Created user ${email}` }
      });
    if (logError) logger.error('Failed to record admin action (create_user):', logError);

    logger.info(`Admin ${req.user.id} created user ${newUser.id}`);

    res.json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    logger.error('Create user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

export default router;
