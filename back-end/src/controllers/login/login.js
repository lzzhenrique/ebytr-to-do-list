const loginService = require('../../services/login');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const createToken = await loginService.login({ email, password });

    if ('error' in createToken) return next(createToken.error);

    return res.status(200).json(createToken);
  } catch (e) {
      next(e);
  }
};

module.exports = login;
