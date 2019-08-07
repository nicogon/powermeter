const dependable = require('dependable');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

async function createContainer() {
  const sessionId = Math.random()
    .toString(36)
    .substring(7);
  const mongo = (await MongoClient.connect('mongodb://localhost:27017').catch(
    console.log
  )).db('powerMeterDb');

  const container = dependable.container();
  const entries = ['services', 'controllers', 'repositories', 'routes.js'];

  entries.forEach(entry => container.load(path.join(__dirname, entry)));

  container.register('mongoClient', function mongoClient() {
    return mongo;
  });

  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';//sessionId;
  });

  return container;
}

module.exports = { createContainer };
