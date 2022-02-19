const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.HOST;
const DB_NAME = 'Ebytr';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connect = async () => {
  try {
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    });
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

module.exports = { connect };