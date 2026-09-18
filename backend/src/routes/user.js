import express from 'express';
import bcrypt from 'bcryptjs';
import supabase from '../config/database.js';
import authService from '../services/authService.js';
import { authenticate } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import logger from '../config/logger.js';

const router = express.Router();

const PROFILE_FIELDS = 'id, email, username, full_name, phone, country, city, avatar_url, role, is_active, created_at';

router.get('/profile', authenticate, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select(PROFILE_FIELDS)
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const { data: wallet } = await supabase
      .from('wallets')
      .select('balance, currency')
      .eq('user_id', req.user.id)
      .single();

    const { data: transactions } = await supabase
      .from('transactions')
      .select('type, amount, status')
      .eq('wallet_id', wallet?.id || '')
      .eq('status', 'completed');

    const totalDeposits = (transactions || [])
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalWithdrawals = (transactions || [])
      .filter((t) => t.type === 'withdrawal')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    res.json({
      success: true,
      data: {
        user,
        wallet: wallet || { balance: 0, currency: 'PKR' },
        stats: { total_deposits: totalDeposits, total_withdrawals: totalWithdrawals }
      }
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

router.put('/profile', authenticate, validate(schemas.updateProfile), async (req, res) => {
  try {
    // Username is set at registration and cannot be changed
    const { full_name, phone, country, city } = req.body;

    const updates = {};
    if (full_name !== undefined) updates.full_name = full_name;
    if (phone !== undefined) {
      const normalizedPhone = authService.normalizePhone(phone);
      if (normalizedPhone && !/^[0-9]{10,15}$/.test(normalizedPhone)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid phone number' });
      }
      if (normalizedPhone) {
        const { data: existingPhone } = await supabase
          .from('users')
          .select('id')
          .eq('phone', normalizedPhone)
          .neq('id', req.user.id)
          .single();
        if (existingPhone) {
          return res.status(400).json({ success: false, error: 'Phone number is already registered' });
        }
      }
      updates.phone = normalizedPhone;
    }
    if (country !== undefined) updates.country = country;
    if (city !== undefined) updates.city = city;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, error: 'No fields to update' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select(PROFILE_FIELDS)
      .single();

    if (error) throw error;

    logger.info(`User ${req.user.id} updated profile`);

    res.json({ success: true, message: 'Profile updated successfully', data: user });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

router.post('/change-password', authenticate, validate(schemas.changePassword), async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, password')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const isValid = await bcrypt.compare(current_password, user.password);
    if (!isValid) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    let { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedPassword, force_password_change: false })
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

    logger.info(`User ${req.user.id} changed password`);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json({ success: false, error: 'Failed to change password' });
  }
});

export default router;
