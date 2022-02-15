const { login } = require('../../services/login');

const newLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await login({ email, password });

    if ('error' in token) return next(token.error);

    return res.status(200).json(token);
  } catch (e) {
      next(e);
  }
};

module.exports = newLogin;
