const { create } = require('../../models')('tasks');
const taskSchema = require('../../validations/joiSchemas/task');

module.exports = async (taskData) => {
  const { userId, ...taskWithoutId } = taskData;
  const { error } = taskSchema.validate(taskWithoutId);

  if (error) {
    error.details[0].status = 400;
    return { error };
  }
  const insertTask = await create(taskData);
  return insertTask;
};