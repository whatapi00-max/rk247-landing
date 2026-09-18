import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/database.js';
import logger from '../config/logger.js';

class AuthService {
  normalizePhone(phone) {
    if (!phone) return '';
    let digits = String(phone).replace(/\D/g, '');
    if (digits.startsWith('0')) digits = '92' + digits.slice(1);
    return digits;
  }

  async register(email, password, username, phone) {
    try {
      const normalizedPhone = this.normalizePhone(phone);

      if (!/^[0-9]{10,15}$/.test(normalizedPhone)) {
        throw new Error('Please enter a valid phone number');
      }

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .ilike('email', email)
        .single();

      if (existingUser) {
        throw new Error('User already exists');
      }

      const { data: existingPhone } = await supabase
        .from('users')
        .select('id')
        .eq('phone', normalizedPhone)
        .single();

      if (existingPhone) {
        throw new Error('Phone number is already registered');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const { data: user, error } = await supabase
        .from('users')
        .insert({
          email,
          password: hashedPassword,
          username,
          phone: normalizedPhone,
          role: 'user'
        })
        .select('id, email, username, phone, role')
        .single();

      if (error) throw error;

      const token = this.generateToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          role: user.role
        },
        token
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  async login(identifier, password) {
    try {
      let query = supabase.from('users').select('*');

      if (String(identifier).includes('@')) {
        query = query.ilike('email', String(identifier).trim());
      } else {
        query = query.eq('phone', this.normalizePhone(identifier));
      }

      const { data: user, error } = await query.single();

      if (error || !user) {
        throw new Error('Invalid credentials');
      }

      if (!user.is_active) {
        throw new Error('Account is inactive');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          phone: user.phone,
          role: user.role,
          force_password_change: user.force_password_change || false
        },
        token
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, username, full_name, phone, country, city, avatar_url, role, created_at')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error fetching user:', error);
      throw error;
    }
  }
}

export default new AuthService();
