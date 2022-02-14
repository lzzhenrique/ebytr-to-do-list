const connection = require('./connection');

module.exports = async (collection, entity) => {
  const insertEntity = await (await connection.connect()).collection(collection).insertOne(entity);
  const { insertedId } = insertEntity;
  
  return { ...entity, _id: insertedId };
};