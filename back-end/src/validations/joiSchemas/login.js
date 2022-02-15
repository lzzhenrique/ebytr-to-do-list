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
    'any.empty': '"passwordLength" is required',
    'number.min': 'password length at least must have 8 caracters',
    'string.required': 'password is a required value',
  }),
});
