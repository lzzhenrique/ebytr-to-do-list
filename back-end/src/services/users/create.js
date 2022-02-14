const { create, getByEmail } = require('../../models')('users');
const userSchema = require('../../validations/joiSchemas/user');
const errObj = require('../../validations/errObjs/userErrs');

const { emailAlreadyExists } = errObj;

module.exports = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) {
    error.details[0].status = 400;
    return { error };
  }

  const emailExists = await getByEmail(user.email);

  if (emailExists) return { error: emailAlreadyExists };

  const createUser = await create(user);

  const { password, ...userWithoutPassword } = createUser;

  return userWithoutPassword;
};