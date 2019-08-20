const dependable = require('dependable');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const { EventEmitter } = require('events');


const medicionEnCurso = {
  nombre: 'oooo',
  duracion: 900000,
  mediciones: {
    medidor1: { index: 0, nombreMedicion: 'iii', dispoId: 'medidor1', data: [] },
    medidor2: { index: 1, nombreMedicion: 'kk', dispoId: 'medidor2', data: [] }
  },
  inicio: 1565223068401,
  fin: 1595223968401,
  sessionId: '4oy0xej'
};


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
  const sessionId = Math.random().toString(36).substring(7);
  let mongo_url = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}`
  const mongo = (await MongoClient.connect(mongo_url, { useNewUrlParser: true })
    .catch(console.log))
    .db('powerMeterDb');

  const container = dependable.container();
  const entries = ['services', 'controllers', 'repositories', 'routes.js'];

  entries.forEach(entry => container.load(path.join(__dirname, entry)));

  container.register('mongoClient', function mongoClient() {
    return mongo;
  });

  container.register('medicionEnCurso', function medicionEnCursofn() {
    return medicionEnCurso;
  });

  container.register('lock', function lock() {
    return new Lock();
  });
  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';// sessionId;
  });

  return container;
}

module.exports = { createContainer };
