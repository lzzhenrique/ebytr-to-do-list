// const { remove } = require('../../models')('tasks');
const model = require('../../models')('tasks');

module.exports = async (id) => {
  const deleteTask = await model.remove(id);
  return deleteTask;
};