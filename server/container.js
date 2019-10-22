const path = require('path');
const { EventEmitter } = require('events');
const dependable = require('dependable');
const sequelize = require('sequelize');

const SimulationElements = require('./models').SimulationElements;
const Medition = require('./models').Medition;
const Report = require('./models').Report;
const Sensor = require('./models').Sensor;
const Simulation = require('./models').Simulation;

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

let tempReport = null;

tempReport = null;

async function createContainer() {
  const sessionId = Math.random().toString(36).substring(7);

  const dispoMem = [];

  const container = dependable.container();
  const entries = ['services', 'controllers', 'repositories', 'routes.js', 'models'];

  entries.forEach(entry => container.load(path.join(__dirname, entry)));

  container.register('tempReport', function tempReportfn() {
    return tempReport;
  });

  container.register('dispoMem', function tempReportfn() {
    return dispoMem;
  });

  container.register('lock', function lock() {
    return new Lock();
  });
  // Models
  container.register('SimulationElements', function meditionFn() { return SimulationElements; });
  container.register('Medition', function sensorFn() { return Medition; });
  container.register('Report', function sensorFn() { return Report; });
  container.register('Sensor', function sensorFn() { return Sensor; });
  container.register('Simulation', function sensorFn() { return Simulation; });

  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';// sessionId;
  });

  return container;
}

module.exports = { createContainer };
