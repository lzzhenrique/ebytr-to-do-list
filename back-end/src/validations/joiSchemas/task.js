const joi = require('joi').extend(require('@joi/date'));

module.exports = joi.object({
  title: joi.string()
  .min(3)
  .max(50)
  .required()
  .messages({
    'string.min': 'Title needs to be at least 5 caracters',
    'string.max': 'Title needs to be at max 50 caracters',
    'any.empty': 'Title is required!',
    'string.required': 'Title needs to be a string',
  }),
  description: joi.string()
  .min(15)
  .max(256)
  .required()
  .messages({
    'any.empty': 'Description is required!',
    'string.min': 'Description needs to be at least 15 caracters',
    'string.max': 'Description needs to be at max 256 caracters',
    'string.required': 'Description needs to be a string',
  }),
  createdAt: joi.date()
  .format('YYYY-MM-DD')
  .raw()
  .required()
  .messages({
    'any.empty': 'createdAt is required!',
    'string.required': 'createdAt needs to be a date',
    'any.date': 'The format of createdAt must be a YYYY-MM-DD',
  }),
  deadline: joi.date()
  .format('YYYY-MM-DD')
  .raw()
  .greater('now')
  .required()
  .messages({
    'any.empty': 'deadline is required!',
    'string.required': 'deadline needs to be a date',
    'date.greater': 'deadline needs to be a date grather than now!',
    'any.date': 'The format of deadline must be a YYYY-MM-DD',
  }),
  status: joi.string()
  .required()
  .messages({
    'any.empty': 'status is required!',
    'string.required': 'status needs to be a string',
  }),
});