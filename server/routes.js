const express = require('express');

module.exports = function routes(devicesController, reportsController, homeController, simulationsController) {
  return express
    .Router()
    .get('/', homeController.home)

    // Dispositivos
    .post('/dispositivos/:dispoId/report', devicesController.report)
    .delete('/dispositivos/:dispoId', devicesController.borrar)
    .put('/dispositivos/:dispoId', devicesController.update)
    .get('/dispositivos', devicesController.toList)

  // Reportes
    .post('/reportes', reportsController.newReport)
    .get('/reportes', reportsController.toList)
    .get('/reportes/new', reportsController.createNewReport)
    .get('/reportes/:reportId', reportsController.reportDetails)
  // TODO: Borrar? editar?

  //Simulaciones
    .get('/simulations', simulationsController.simulations)
    .get('/simulations/new', simulationsController.createNewSimulation);

    
};
