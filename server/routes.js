const express = require('express');

const homeController = require('./controllers/homeController');
const dispositivosController = require('./controllers/dispositivosController');


module.exports = express
  .Router()
  .get('/', homeController.mainHome)
  .post('/dispositivos/:dispoId/report', dispositivosController.report)
  .get('/dispositivos', dispositivosController.listar);
