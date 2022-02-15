const express = require('express');
const task = require('./create');
const auth = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/', auth, task);

module.exports = router;
