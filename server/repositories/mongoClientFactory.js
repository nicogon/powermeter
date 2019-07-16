const MongoClient = require('mongodb').MongoClient;


const dbName = 'testDb';

// Use connect method to connect to the server

module.exports = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017').catch(
    console.log,
  );
  return client.db(dbName);
};
