const path = require('path');
const { EventEmitter } = require('events');
const dependable = require('dependable');
const sequelize = require('sequelize');

const MeditionSimulation = require('./models').MeditionSimulation;
const Medition = require('./models').Medition;
const PuntualMedition = require('./models').PuntualMedition;
const Report = require('./models').Report;
const Sensor = require('./models').Sensor;
const Simulation = require('./models').Simulation;

const tempReport = {
  name: 'oooo',
  secondsDuration: 900000,
  meditions: [
    { index: 0, nombreMedicion: 'iii', meditionId: '1', data: [] },
    { index: 1, nombreMedicion: 'kk', meditionId: '2', data: [] },
  ],
  timeStart: 1565223068401,
  timeEnd: 1595223968401,
  sessionId: '4oy0xej'
};

async function createContainer() {
  const sessionId = Math.random().toString(36).substring(7);

  let dispoMem = [];

  const container = dependable.container();
  const entries = ['services', 'controllers', 'repositories', 'routes.js', 'models'];

  entries.forEach(entry => container.load(path.join(__dirname, entry)));

  container.register('tempReport', function tempReportfn() {
    return tempReport;
  });

  container.register('dispoMem', function tempReportfn() {
    return dispoMem;
  });

  // Models
  container.register('MeditionSimulation', function meditionFn() { return MeditionSimulation; });
  container.register('Medition', function sensorFn() { return Medition; });
  container.register('PuntualMedition', function sensorFn() { return PuntualMedition; });
  container.register('Report', function sensorFn() { return Report; });
  container.register('Sensor', function sensorFn() { return Sensor; });
  container.register('Simulation', function sensorFn() { return Simulation; });

  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';// sessionId;
  });

  return container;
}

module.exports = { createContainer };
