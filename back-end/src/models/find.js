const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = async (collection, id) => {
  if (!id) {
    const findAllTasks = (await connection.connect()).collection(collection).find({}).toArray();
    return findAllTasks;
  }

  const findTaskById = (
    await connection.connect()).collection(collection).findOne({ _id: ObjectId(id) });
  return findTaskById;
};