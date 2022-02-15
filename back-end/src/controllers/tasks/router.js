const express = require('express');
const find = require('./find');
const create = require('./create');
const auth = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/:id', find);
router.get('/', find);
router.post('/', auth, create);

module.exports = router;
