const express = require('express');

module.exports = function routes(sensorsController, reportsController, homeController, simulationsController) {
  return express
    .Router()
    .get('/', homeController.home)

    // Dispositivos
    .post('/sensores/:dispoId/report', sensorsController.report)
    .delete('/sensores/:sensorId', sensorsController.borrar)
    .put('/sensores/:sensorId', sensorsController.update)
    .get('/sensores', sensorsController.toList)

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
