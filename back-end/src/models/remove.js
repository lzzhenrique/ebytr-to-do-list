const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = async (collection, id) => {
  const removeRecipe = (
    await connection.connect()).collection(collection).deleteOne({ _id: ObjectId(id) });
  return removeRecipe;
};