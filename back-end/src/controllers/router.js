const express = require('express');
const users = require('./users/router');
const login = require('./login/router');

const root = express.Router({ mergeParams: true });

root.use('/users', users);
root.use('/login', login);

module.exports = root;