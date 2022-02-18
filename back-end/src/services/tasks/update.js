const { update, find } = require('../../models')('tasks');
const taskSchema = require('../../validations/joiSchemas/task');
const { userNotAuthorized } = require('../../validations/errObjs/userErrs');

module.exports = async (task) => {
  const { postId, userId, ...taskWithoutIdAndUserId } = task;
  const { error } = taskSchema.validate(taskWithoutIdAndUserId);
  
  const userAuthorized = await find({ postId });
  
  if (userAuthorized.userId !== userId) return { error: userNotAuthorized };

  if (error) {
    error.details[0].status = 400;
    return { error };
  }
  
  return update({ ...taskWithoutIdAndUserId, postId });
};