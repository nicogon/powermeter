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
    .post('/reportes/merge', reportsController.mergeReport)
    .get('/reportes/:reportId', reportsController.reportDetails)
    .delete('/reportes/:reportId', reportsController.deleteReport)

  // TODO: Borrar? editar?

  // Simulaciones
    .get('/simulaciones', simulationsController.simulations)
    .get('/simulaciones/new', simulationsController.createNewSimulation)
    .post('/simulaciones/', simulationsController.newSimulation)
    .get('/simulaciones/:simulationId', simulationsController.simulationDetails)
    .delete('/simulaciones/:simulationId', simulationsController.deleteSimulation);
};
