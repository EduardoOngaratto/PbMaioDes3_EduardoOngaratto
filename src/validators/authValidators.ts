import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'O firstName é obrigatório!',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'O lastName é obrigatório!',
  }),
  birthDate: Joi.date().required().messages({
    'any.required': 'O birthDate é obrigatório!',
  }),
  city: Joi.string().required().messages({
    'any.required': 'O city é obrigatório!',
  }),
  country: Joi.string().required().messages({
    'any.required': 'O country é obrigatório!',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'O email é obrigatório!',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'O password é obrigatório!',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'As senhas não conferem',
    'any.required': 'O confirmPassword é obrigatório!',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'O email é obrigatório!',
  }),
  password: Joi.string().required().messages({
    'any.required': 'O password é obrigatório!',
  }),
});
