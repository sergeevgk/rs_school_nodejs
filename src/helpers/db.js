const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const seedData = require('./db-init');

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', () => console.error('Connection to database failed.'));
  db.once('open', async () => {
    console.log('Connection to database succeed.');
    await seedData();
    callback();
  });
};

module.exports = connectToDB;
