const express = require('express');
const find = require('./find');
const create = require('./create');
const update = require('./update');
const remove = require('./remove');
const auth = require('../../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.delete('/:id', auth, remove);
router.put('/:id', auth, update);
router.get('/:id', auth, find);
router.get('/', auth, find);
router.post('/', auth, create);
module.exports = router;
