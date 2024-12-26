const Joi = require("joi");

const userValidationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required()
      .messages({
        'string.base': 'Name must be a string.',
        'string.alphanum': 'Name can only contain letters and numbers.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name cannot exceed 30 characters.',
        'any.required': 'Name is required.',
      }),
    password: Joi.string().min(8).required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
      .messages({
        'string.base': 'Password must be a string.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base': 'Password must include at least one uppercase letter, one lowercase letter, and one digit.',
        'any.required': 'Password is required.',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
      }),
    role: Joi.string().valid('user', 'admin', 'partner').default('user')
      .messages({
        'any.only': 'Role must be either "user", "admin" or "partner".',
      }),
});

module.exports = { userValidationSchema };