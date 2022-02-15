const { create } = require('../../services/tasks');

const newTask = async (req, res, next) => {
  try {
    const { title, description, createdAt, deadline, status } = req.body;
    const { _id: userId } = req.user;

    const createTask = await create({ title, description, createdAt, deadline, status, userId });

    if ('error' in createTask) return next(createTask.error);

    return res.status(201).json({ task: createTask });
  } catch (e) {
      next(e);
  }
};

module.exports = newTask;