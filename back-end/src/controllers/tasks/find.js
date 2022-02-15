const { find } = require('../../services/tasks');

const findTasks = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const getAllTasks = await find();
      return res.status(200).json(getAllTasks);
    }

    const getTaskById = await find(id);

    if ('error' in getTaskById) return next(getTaskById.error);

    return res.status(200).json(getTaskById);
  } catch (e) {
      next(e);
  }
};

module.exports = findTasks;