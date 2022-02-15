const { update } = require('../../services/tasks');

const updateTask = async (req, res, next) => {
  try {
    const { title, description, createdAt, deadline, status } = req.body;
    const { id: postId } = req.params;
    const { _id: userId } = req.user;

    const taskUpdated = await update({ 
      description,
      createdAt,
      deadline,
      status,
      postId,
      userId,
      title,
     });

    if ('error' in taskUpdated) return next(taskUpdated.error);

    return res.status(200).json(taskUpdated);
  } catch (e) {
      next(e);
  }
};

module.exports = updateTask;