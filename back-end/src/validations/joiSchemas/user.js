const joi = require('joi');

module.exports = joi.object({
  email: joi.string()
    .email()
    .required()
    .messages({
      'any.empty': 'email is required',
      'email.required': 'email input must be a valid e-mail',
    }),
  password: joi.string()
    .min(8)
    .required()
    .messages({
      'any.empty': 'password is required',
      'number.min': 'the password must have at least 8 caracters',
      'string.required': 'password is a required',
    }),
  name: joi.string()
    .min(3)
    .required()
    .messages({
      'any.empty': 'name is required',
      'number.min': 'the name must have at least 5 caracters',
      'string.required': 'name is a required',
    }),
});
