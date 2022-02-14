const getByEmail = require('./getByEmail');
const createModel = require('./create');

module.exports = (collection) => ({
  getByEmail: (email) => getByEmail(collection, email),
  create: (entity) => createModel(collection, entity),
});