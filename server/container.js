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
   name: 'casa',
  secondsDuration: 86400000,
  meditions:
   [ { id: '2',
       name: 'heladera',
       data: [],
       currentPower: 0,
       maximumPower: 0,
       averagePower: 0,
       meditionCounter: 0 } ],
  timeStart: 1569111444317,
  timeEnd: 1569197844317,
  currentPower: 0,
  maximumPower: 0,
  averagePower: 0,
  meditionCounter: 0 }
;

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
