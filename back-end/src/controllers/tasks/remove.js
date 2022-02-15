const { remove } = require('../../services/tasks');

const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    await remove(id);

    return res.status(204).end();
  } catch (e) {
      next(e);
  }
};

module.exports = removeTask;