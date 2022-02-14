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

// const createToken = async (user) => {
//   const { email, password } = user;

//   const verifyUser = await getUserByEmail({ email, password });

//   if (!verifyUser) {
//     return {
//       error: {
//         status: StatusCodes.NOT_FOUND,
//         message: 'Não existe usuário com esse e-mail ou senha.',
//       },
//     };
//   }

//   const token = JWT.sign({ data: verifyUser }, process.env.LOGIN_SECRET, JWT_CONFIG);

//   return {
//     token,
//     user: {
//       ...verifyUser,
//     },
//   };
// };