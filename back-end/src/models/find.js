const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = async (collection, { userId, postId }) => {
  if (!postId) {
    const findAllTasksByUserId = (await connection.connect()).collection(collection).find({
      userId,
    }).toArray();
    return findAllTasksByUserId;
  }

  const findTaskByPostId = (
    await connection.connect()).collection(collection).findOne({ _id: ObjectId(postId) });
    
    return findTaskByPostId;
};