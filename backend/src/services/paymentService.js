import apayService from './apayService.js';
import logger from '../config/logger.js';

class PaymentService {
  async initiatePayment(transactionId, amount, userId, userEmail, userName, paymentSystem = 'raast_p2p') {
    try {
      logger.info(`Initiating ${paymentSystem} payment for user ${userId}`, {
        amount,
        transactionId
      });

      // Route to appropriate payment service based on payment_system
      switch (paymentSystem) {
        case 'raast_p2p':
          return await apayService.initiatePayment(
            transactionId,
            amount,
            userId,
            userEmail,
            userName,
            paymentSystem
          );
        
        case 'easypaisa':
          return await apayService.initiatePayment(
            transactionId,
            amount,
            userId,
            userEmail,
            userName,
            paymentSystem
          );
        
        case 'jazzcash_fast':
          return await apayService.initiatePayment(
            transactionId,
            amount,
            userId,
            userEmail,
            userName,
            paymentSystem
          );
        
        case 'nayapay_l':
          return await apayService.initiatePayment(
            transactionId,
            amount,
            userId,
            userEmail,
            userName,
            paymentSystem
          );
        
        default:
          throw new Error(`Unsupported payment system: ${paymentSystem}`);
      }
    } catch (error) {
      logger.error(`Payment initiation error for ${paymentSystem}:`, error);
      throw error;
    }
  }

  async verifyPaymentCallback(callbackData, paymentSystem = 'raast_p2p') {
    try {
      logger.info(`Verifying ${paymentSystem} payment callback`, {
        callbackData
      });

      // Route to appropriate payment service based on payment_system
      switch (paymentSystem) {
        case 'raast_p2p':
        case 'easypaisa':
        case 'jazzcash_fast':
        case 'nayapay_l':
          return await apayService.verifyPaymentCallback(callbackData);
        
        default:
          throw new Error(`Unsupported payment system: ${paymentSystem}`);
      }
    } catch (error) {
      logger.error(`Payment verification error for ${paymentSystem}:`, error);
      throw error;
    }
  }
}

export default new PaymentService();
