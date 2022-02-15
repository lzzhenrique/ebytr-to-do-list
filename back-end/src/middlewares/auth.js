const JWT = require('jsonwebtoken');
const { getByEmail } = require('../models')('users');
const { invalidToken, badToken, userNotFound } = require('../validations/errObjs/userErrs');

const { LOGIN_SECRET } = process.env;

const jwtVerify = async (token) => {
  const { data } = JWT.verify(token, LOGIN_SECRET);
  delete data.email;
  return data;
};

const validateUser = async (token, email, password) => {
  if (!token) return invalidToken;
  
  const userExists = await getByEmail(email);
  if (!userExists || password !== userExists.password) return userNotFound;

  return { validUser: true };
};

const main = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    const { email, password } = req.body;

    const validatedUserData = await validateUser(token, email, password);
    if ('code' in validatedUserData) next(validatedUserData);

    const userJWTData = await jwtVerify(token);

    req.user = userJWTData;
    next();
  } catch (err) {
    if (err.message === badToken.message) return next(badToken);
    next(err);
  }
};

module.exports = main;
