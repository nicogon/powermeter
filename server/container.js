const dependable = require('dependable');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const { EventEmitter } = require('events');

class Lock {
  constructor() {
    this._locked = false;
    this._ee = new EventEmitter();
  }

  acquire() {
    return new Promise((resolve) => {
      // If nobody has the lock, take it and resolve immediately
      if (!this._locked) {
        // Safe because JS doesn't interrupt you on synchronous operations,
        // so no need for compare-and-swap or anything like that.
        this._locked = true;
        return resolve();
      }

      // Otherwise, wait until somebody releases the lock and try again
      const tryAcquire = () => {
        if (!this._locked) {
          this._locked = true;
          this._ee.removeListener('release', tryAcquire);
          return resolve();
        }
      };
      this._ee.on('release', tryAcquire);
    });
  }

  release() {
    // Release the lock immediately
    this._locked = false;
    setImmediate(() => this._ee.emit('release'));
  }
}

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

  container.register('lock', function mongoClient() {
    return new Lock();
  });
  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';// sessionId;
  });

  return container;
}

module.exports = { createContainer };
