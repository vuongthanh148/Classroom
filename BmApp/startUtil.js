require('./modelBase');
const config = require('../config/database');
const mongodb = require('mongodb');
const { resolve } = require('path');

process.app = app = {};
app.config = config;
module.exports.startApp = async function (callback) {
  await startDB();
  callback();
}

function startDB() {
  return new Promise((resolve, reject) => {
    mongodb.connect(
      config.uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(async client => {
      const db = client.db(config.dbName);
      app.db = db;
      resolve();
    }).catch((err) => {
      console.log(err);
      reject(err);
    })
  });
}