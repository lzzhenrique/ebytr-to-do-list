const JWT = require('jsonwebtoken');
const { getByEmail } = require('../models')('users');
const { invalidToken, badToken, userNotFound } = require('../validations/errObjs/userErrs');

const { LOGIN_SECRET } = process.env;

module.exports = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) return next(invalidToken);

    const { data } = JWT.verify(token, LOGIN_SECRET);

    const userData = await getByEmail(data.email);

    if (!userData) return next(userNotFound);

    req.user = userData;
    next();
  } catch (err) {
    if (err.message === badToken.message) return next(badToken);
    next(err);
  }
};
