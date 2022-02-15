const { create } = require('../../models')('tasks');
const recipeSchema = require('../../validations/joiSchemas/task');

module.exports = async (taskData) => {
  const { userId, ...taskWithoutId } = taskData;
  const { error } = recipeSchema.validate(taskWithoutId);

  if (error) {
    error.details[0].status = 400;
    return { error };
  }
  const insertTask = await create(taskData);
  return insertTask;
};