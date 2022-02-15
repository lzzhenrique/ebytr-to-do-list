const { remove } = require('../../models')('tasks');

module.exports = async (id) => {
  const deleteRecipe = await remove(id);
  return deleteRecipe;
};