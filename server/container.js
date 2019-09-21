const path = require('path');
const { EventEmitter } = require('events');
const dependable = require('dependable');
const sequelize = require('sequelize');

const Medition = require('./models').Medition;
const Sensor = require('./models').Sensor;
const PuntualMedition = require('./models').PuntualMedition;

const medicionEnCurso = {
  nombre: 'oooo',
  duracion: 900000,
  mediciones: [
    { index: 0, nombreMedicion: 'iii', deviceId: '1', data: [] },
    { index: 1, nombreMedicion: 'kk', deviceId: '2', data: [] },
  ],
  inicio: 1565223068401,
  fin: 1595223968401,
  sessionId: '4oy0xej'
};

async function createContainer() {
  const sessionId = Math.random().toString(36).substring(7);

  let dispoMem = [];

  const container = dependable.container();
  const entries = ['services', 'controllers', 'repositories', 'routes.js', 'models'];

  entries.forEach(entry => container.load(path.join(__dirname, entry)));

  container.register('medicionEnCurso', function medicionEnCursofn() {
    return medicionEnCurso;
  });

  container.register('dispoMem', function medicionEnCursofn() {
    return dispoMem;
  });

  // Models
  container.register('Medition', function deviceFn() { return Medition; });
  container.register('Sensor', function sensorFn() { return Sensor; });
  container.register('PuntualMedition', function sensorFn() { return PuntualMedition; });

  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';// sessionId;
  });

  return container;
}

module.exports = { createContainer };
