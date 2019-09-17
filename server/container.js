const dependable = require('dependable');
const path = require('path');
const { EventEmitter } = require('events');

const medicionEnCurso = {
  nombre: 'oooo',
  duracion: 900000,
  mediciones: [
    { index: 0, nombreMedicion: 'iii', dispoId: 'medidor1', data: [] },
    { index: 1, nombreMedicion: 'kk', dispoId: 'medidor2', data: [] },
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

  container.register('sessionId', function sessionIdFn() {
    return '4oy0xej';// sessionId;
  });

  return container;
}

module.exports = { createContainer };
