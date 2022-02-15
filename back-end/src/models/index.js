const getUserByEmail = require('./getUserByEmail');
const createEntity = require('./create');
const findEntity = require('./find');
const updateEntity = require('./update');
const removeEntity = require('./remove');

module.exports = (collection) => ({
  getByEmail: (email) => getUserByEmail(collection, email),
  update: (entity) => updateEntity(collection, entity),
  create: (entity) => createEntity(collection, entity),
  remove: (id) => removeEntity(collection, id),
  find: (id) => findEntity(collection, id),
});