import axios from 'axios';
import crypto from 'crypto';
import logger from '../config/logger.js';
import supabase from '../config/database.js';

class APayService {
  constructor() {
    this.apiKey = process.env.APAY_API_KEY;
    this.accessKey = process.env.APAY_ACCESS_KEY;
    this.privateKey = process.env.APAY_PRIVATE_KEY;
    this.projectId = process.env.APAY_PROJECT_ID;
    this.apiUrl = process.env.APAY_API_URL || 'https://api.a-pay.one';
    this.callbackUrl = process.env.APAY_CALLBACK_URL;
    this.returnUrl = process.env.APAY_RETURN_URL;
  }

  generateWebhookSignature(transactions) {
    const transactionsJson = JSON.stringify(transactions);
    const md5Hash = crypto.createHash('md5').update(transactionsJson).digest('hex');
    const signatureString = this.accessKey + this.privateKey + md5Hash;
    return crypto.createHash('sha1').update(signatureString).digest('hex');
  }

  async initiatePayment(transactionId, amount, userId, userEmail, userName, paymentSystem = 'raast_p2p') {
    try {
      if (!this.apiKey || !this.projectId) {
        throw new Error('A-Pay credentials not configured. Please add your A-Pay API keys to the .env file');
      }

      const customTransactionId = `RK247_${transactionId}`;
      
      // First, try to create a payment page (which returns a URL)
      const paymentPageData = {
        amount: parseInt(amount),
        currency: 'PKR',
        payment_system: paymentSystem,
        custom_transaction_id: customTransactionId,
        custom_user_id: String(userId),
        return_url: this.returnUrl,
        callback_url: this.callbackUrl,
        data: {
          customer_name: userName || 'User'
        }
      };

      logger.info('Creating A-Pay payment page:', {
        url: `${this.apiUrl}/Remotes/create-payment-page`,
        hasApiKey: !!this.apiKey
      });

      const response = await axios.post(
        `${this.apiUrl}/Remotes/create-payment-page`,
        paymentPageData,
        {
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.apiKey
          }
        }
      );

      logger.info('A-Pay payment page response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Payment initiation failed');
      }

      const paymentUrl = response.data.url;
      const orderId = response.data.order_id;

      let { data: apayPayment, error } = await supabase
        .from('apay_payments')
        .insert({
          transaction_id: transactionId,
          apay_transaction_id: orderId,
          order_id: orderId,
          amount,
          status: 'pending',
          payment_url: paymentUrl,
          payment_method: paymentSystem
        })
        .select()
        .single();

      // Fallback if apay_payments.order_id column does not exist yet
      if (error && error.code === '42703' && (error.message || '').includes('order_id')) {
        const fallback = await supabase
          .from('apay_payments')
          .insert({
            transaction_id: transactionId,
            apay_transaction_id: orderId,
            amount,
            status: 'pending',
            payment_url: paymentUrl,
            payment_method: paymentSystem
          })
          .select()
          .single();

        apayPayment = fallback.data;
        error = fallback.error;
      }

      if (error) throw error;

      // Update the transactions table with order_id (optional - may fail if column doesn't exist)
      try {
        const { error: txError } = await supabase
          .from('transactions')
          .update({ order_id: orderId })
          .eq('id', transactionId);

        if (txError) {
          logger.error('Failed to update transaction with order_id:', txError);
        }
      } catch (err) {
        logger.error('Error updating transaction with order_id (column may not exist yet):', err.message);
      }

      return {
        payment_url: paymentUrl,
        order_id: orderId,
        apay_payment_id: apayPayment.id,
        status: 'Pending'
      };
    } catch (error) {
      logger.error('A-Pay payment initiation error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });
      
      if (error.message.includes('A-Pay credentials not configured')) {
        throw error;
      }
      
      if (error.response?.data) {
        const errorMsg = error.response.data.message || JSON.stringify(error.response.data);
        throw new Error(`A-Pay API Error: ${errorMsg}`);
      }
      
      throw new Error('Failed to initiate payment. Please try again later.');
    }
  }

  async verifyPaymentCallback(callbackData) {
    try {
      const { access_key, signature, transactions } = callbackData;

      if (access_key !== this.accessKey) {
        throw new Error('Invalid access key');
      }

      const expectedSignature = this.generateWebhookSignature(transactions);
      if (signature !== expectedSignature) {
        throw new Error('Invalid payment signature');
      }

      const results = [];
      for (const transaction of transactions) {
        const { data: apayPayment, error } = await supabase
          .from('apay_payments')
          .select('*, transactions(*)')
          .eq('apay_transaction_id', transaction.order_id)
          .single();

        if (error || !apayPayment) {
          logger.error(`Payment record not found for order_id: ${transaction.order_id}`);
          continue;
        }

        const paymentStatus = transaction.status === 'Success' ? 'completed' : 
                            transaction.status === 'Failed' ? 'failed' : 'rejected';

        await supabase
          .from('apay_payments')
          .update({
            status: paymentStatus,
            callback_data: transaction,
            updated_at: new Date().toISOString()
          })
          .eq('id', apayPayment.id);

        results.push({
          transaction_id: apayPayment.transaction_id,
          status: paymentStatus,
          amount: apayPayment.amount
        });
      }

      return results;
    } catch (error) {
      logger.error('Payment verification error:', error);
      throw error;
    }
  }

  async getPaymentStatus(orderId) {
    try {
      if (!this.apiKey || !this.projectId) {
        throw new Error('A-Pay credentials not configured');
      }

      const response = await axios.get(
        `${this.apiUrl}/Remotes/deposit-info?project_id=${this.projectId}&order_id=${orderId}`,
        {
          headers: {
            'apikey': this.apiKey
          }
        }
      );

      return response.data;
    } catch (error) {
      logger.error('Error fetching payment status:', error);
      throw error;
    }
  }
}

export default new APayService();
