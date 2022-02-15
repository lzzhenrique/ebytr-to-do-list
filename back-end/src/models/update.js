const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = async (collection, entity) => {
  const { postId, ...taskWithoutId } = entity;
  const update = await (await connection.connect()).collection(collection).updateOne(
    {
      _id: ObjectId(postId),
    },
    {
      $set: { ...taskWithoutId },
    },
  );
  
  return update;
};
