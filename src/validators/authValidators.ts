import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'The firstName is required!',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'The lastName is required!',
  }),
  birthDate: Joi.date().required().messages({
    'any.required': 'The birthDate is required!',
  }),
  city: Joi.string().required().messages({
    'any.required': 'The city is required!',
  }),
  country: Joi.string().required().messages({
    'any.required': 'The country is required!',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'The email is required!',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'The password must be at least 6 characters long',
    'any.required': 'The password is required!',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'The confirmPassword is required!',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'The email is required!',
  }),
  password: Joi.string().required().messages({
    'any.required': 'The password is required!',
  }),
});
