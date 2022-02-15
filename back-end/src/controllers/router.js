const express = require('express');
const user = require('./users/router');
const login = require('./login/router');
const task = require('./tasks/router');

const root = express.Router({ mergeParams: true });

root.use('/new-user', user);
root.use('/login', login);
root.use('/task', task);

module.exports = root;