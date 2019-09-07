const express = require('express');

module.exports = function routes(devicesController, reportesController, homeController, simulationsController) {
  return express
    .Router()
    .get('/', homeController.home)

    // Dispositivos
    .post('/dispositivos/:dispoId/report', devicesController.report)
    .delete('/dispositivos/:dispoId', devicesController.borrar)
    .put('/dispositivos/:dispoId', devicesController.update)
    .get('/dispositivos', devicesController.toList)

  // Reportes
    .post('/reportes', reportesController.newReport)
    .get('/reportes', reportesController.toList)
    .get('/reportes/new', reportesController.createNewReport)
    .get('/reportes/:reporteId', reportesController.reportDetails)
  // TODO: Borrar? editar?

  //Simulaciones
    .get('/simulations', simulationsController.simulations)
    .get('/simulations/new', simulationsController.createNewSimulation);

    
};
