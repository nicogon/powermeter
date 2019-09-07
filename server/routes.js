const express = require('express');

module.exports = function routes(dispositivosController, reportesController, homeController, simulationsController) {
  return express
    .Router()
    .get('/', homeController.home)

    // Dispositivos
    .post('/dispositivos/:dispoId/report', dispositivosController.report)
    .delete('/dispositivos/:dispoId', dispositivosController.borrar)
    .put('/dispositivos/:dispoId', dispositivosController.update)
    .get('/dispositivos', dispositivosController.toList)

  // Reportes
    .post('/reportes', reportesController.nuevoReporte)
    .get('/reportes', reportesController.toList)
    .get('/reportes/new', reportesController.crearNuevoReporte)
    .get('/reportes/:reporteId', reportesController.reportDetails)
  // TODO: Borrar? editar?

  //Simulaciones
    .get('/simulations', simulationsController.simulations)
    .get('/simulations/new', simulationsController.createNewSimulation);

    
};
