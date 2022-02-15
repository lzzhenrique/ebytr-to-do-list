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
  userNotAuthorized: {
    code: 401,
    message: 'You don\'t have authorization to edit this task!',
  },
};