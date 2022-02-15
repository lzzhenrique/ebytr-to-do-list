const JWT = require('jsonwebtoken');
const { getByEmail } = require('../../models')('users');

const loginSchema = require('../../validations/joiSchemas/login');
const errObj = require('../../validations/errObjs/loginErrs');

const JWT_CONFIG = { expiresIn: '7d', algorithm: 'HS256' };

const { emailOrPasswordNotExist } = errObj;
const { LOGIN_SECRET } = process.env;

module.exports = async (user) => {
  const { error } = loginSchema.validate(user);
  if (error) {
    error.details[0].status = 401;
    return { error };
  }

  const emailExists = await getByEmail(user.email);

  if (!emailExists) return { error: emailOrPasswordNotExist };

  const { password, name, ...userWithoutPasswordAndName } = emailExists;

  const token = JWT.sign({ data: userWithoutPasswordAndName }, LOGIN_SECRET, JWT_CONFIG);

  return { token };
};