const getUserByEmail = require('./getUserByEmail');
const createEntity = require('./create');
const findEntity = require('./find');

module.exports = (collection) => ({
  getByEmail: (email) => getUserByEmail(collection, email),
  create: (entity) => createEntity(collection, entity),
  find: (id) => findEntity(collection, id),
});