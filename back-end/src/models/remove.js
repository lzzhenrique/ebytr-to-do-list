const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = async (collection, id) => {
  const removeTask = (
    await connection.connect()).collection(collection).deleteOne({ _id: ObjectId(id) });
  return removeTask;
};