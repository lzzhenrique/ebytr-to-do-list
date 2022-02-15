const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = async (collection, entity) => {
  const { postId, ...taskWithoutIdAndUserId } = entity;
  const update = await (await connection.connect()).collection(collection).updateOne(
    {
      _id: ObjectId(postId),
    },
    {
      $set: { ...taskWithoutIdAndUserId },
    },
  );
  
  return update;
};
