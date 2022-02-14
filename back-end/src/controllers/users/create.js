const { create } = require('../../services/users');

const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const verifyUser = await create({ name, email, password });

    if ('error' in verifyUser) return next(verifyUser.error);

    return res.status(201).json({ ...verifyUser });
  } catch (e) {
      next(e);
  }
};

module.exports = newUser;