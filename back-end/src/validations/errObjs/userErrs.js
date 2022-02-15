module.exports = {
  emailAlreadyExists: {
    code: 409,
    message: 'E-mail already registered',
  },
  badToken: {
    code: 401,
    message: 'Jwt malformed',
  },
  userNotFound: {
    code: 404,
    message: 'This user not exist',
  },
  invalidToken: {
    code: 401,
    message: 'Missing auth token',
  },
};