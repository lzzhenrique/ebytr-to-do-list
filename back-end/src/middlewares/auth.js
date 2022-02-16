const JWT = require('jsonwebtoken');
const { invalidToken, badToken } = require('../validations/errObjs/userErrs');

const { LOGIN_SECRET } = process.env;

const jwtVerify = async (token) => {
  const { data } = JWT.verify(token, LOGIN_SECRET);
  delete data.email;
  return data;
};

const main = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return next(invalidToken);

    const userJWTData = await jwtVerify(token);

    req.user = userJWTData;
    next();
  } catch (err) {
    if (err.message === badToken.message) return next(badToken);
    next(err);
  }
};

module.exports = main;
