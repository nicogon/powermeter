const express = require('express');

module.exports = function routes(devicesController, reportsController, homeController, simulationsController) {
  return express
    .Router()
    .get('/', homeController.home)

    // Dispositivos
    .post('/devices/:dispoId/report', devicesController.report)
    .delete('/devices/:dispoId', devicesController.borrar)
    .put('/devices/:dispoId', devicesController.update)
    .get('/devices', devicesController.toList)

  // Reportes
    .post('/reportes', reportsController.newReport)
    .get('/reportes', reportsController.toList)
    .get('/reportes/new', reportsController.createNewReport)
    .get('/reportes/:reportId', reportsController.reportDetails)
  // TODO: Borrar? editar?

  //Simulaciones
    .get('/simulations', simulationsController.simulations)
    .get('/simulations/new', simulationsController.createNewSimulation)
    .post('/simulations/', simulationsController.newSimulation)
    .get('/simulations/:simulationId', simulationsController.simulationDetails);

    
};
