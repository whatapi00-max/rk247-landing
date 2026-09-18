import Joi from 'joi';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors 
      });
    }
    
    next();
  };
};

export const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(9).max(20).required()
  }),

  login: Joi.object({
    identifier: Joi.string(),
    email: Joi.string(),
    password: Joi.string().required()
  }).or('identifier', 'email'),

  deposit: Joi.object({
    amount: Joi.number().min(100).max(250000).required(),
    payment_system: Joi.string().valid('raast_p2p', 'easypaisa', 'jazzcash_fast', 'nayapay_l').optional().default('raast_p2p')
  }),

  withdraw: Joi.object({
    amount: Joi.number().min(100).required()
  }),

  deductPoints: Joi.object({
    amount: Joi.number().min(1).required(),
    description: Joi.string().required()
  }),

  adminAdjustment: Joi.object({
    amount: Joi.number().required(),
    type: Joi.string().valid('credit', 'debit').required(),
    description: Joi.string().required()
  }),

  updateProfile: Joi.object({
    full_name: Joi.string().max(150).allow('').optional(),
    phone: Joi.string().max(30).allow('').optional(),
    country: Joi.string().max(100).allow('').optional(),
    city: Joi.string().max(100).allow('').optional()
  }),

  changePassword: Joi.object({
    current_password: Joi.string().required(),
    new_password: Joi.string()
      .min(8)
      .pattern(/[A-Z]/, 'uppercase letter')
      .pattern(/[a-z]/, 'lowercase letter')
      .pattern(/\d/, 'number')
      .pattern(/[!@#$%^&*(),.?":{}|<>]/, 'special character')
      .required()
  })
};
