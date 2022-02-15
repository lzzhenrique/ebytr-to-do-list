const { ObjectId } = require('mongodb');
const { find } = require('../../models')('tasks');
const { recipeNotFound } = require('../../validations/errObjs/taskErrs');

module.exports = async (id) => {
  if (!id) {
    const getTasks = await find();
    return getTasks;
  }

  if (!ObjectId.isValid(id)) return { error: recipeNotFound };

  const getTaskById = await find(id);

  if (!getTaskById) return { error: recipeNotFound };

  return getTaskById;
};