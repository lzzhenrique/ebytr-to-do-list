const { remove } = require('../../models')('tasks');

module.exports = async (id) => {
  const deleteTask = await remove(id);
  return deleteTask;
};