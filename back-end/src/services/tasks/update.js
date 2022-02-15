const { update } = require('../../models')('tasks');
const taskSchema = require('../../validations/joiSchemas/task');

module.exports = async (task) => {
  const { postId, userId, ...taskWithoutIdAndUserId } = task;
  const { error } = taskSchema.validate(taskWithoutIdAndUserId);

  if (error) {
    error.details[0].status = 400;
    return { error };
  }
  
  return update({ ...taskWithoutIdAndUserId, postId });
};