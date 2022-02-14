const connection = require('./connection');

module.exports = async (collection, email) => {
  const findByEmail = (
    await connection.connect()).collection(collection).findOne({ email });
  return findByEmail;
};