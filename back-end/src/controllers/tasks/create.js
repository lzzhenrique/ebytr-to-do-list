const { create } = require('../../services/tasks');

const newTask = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;

    const createRecipe = await create({ name, ingredients, preparation, userId });

    if ('error' in createRecipe) return next(createRecipe.error);

    return res.status(201).json({ recipe: createRecipe });
  } catch (e) {
      next(e);
  }
};

module.exports = newTask;