const express = require('express');
const cors = require('cors');
const root = require('../controllers/router');
const error = require('../middlewares/err');

const app = express();

app.use(cors({
  origin: 'https://ebytr-to-do-list.vercel.app',
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
}));

app.use(express.json());

app.use('/', root);

app.use(error);

module.exports = app;
