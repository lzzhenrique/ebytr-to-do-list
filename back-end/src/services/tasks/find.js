const { ObjectId } = require('mongodb');
const { find } = require('../../models')('tasks');
const { taskNotFound } = require('../../validations/errObjs/taskErrs');

module.exports = async ({ postId, userId }) => {
  console.log(postId, userId);
  if (!postId) {
    const getTasks = await find({ userId });
    return getTasks;
  }

  if (!ObjectId.isValid(postId)) return { error: taskNotFound };

  const getTaskById = await find({ postId });

  if (!getTaskById) return { error: taskNotFound };

  return getTaskById;
};