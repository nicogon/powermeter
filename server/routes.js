const express = require('express');

module.exports = function routes(homeController, dispositivosController, reportesController) {
  return express
    .Router()
    .get('/', homeController.mainHome)

    // Dispositivos
    .post('/dispositivos/:dispoId/report', dispositivosController.report)
    .delete('/dispositivos/:dispoId', dispositivosController.borrar)
    .put('/dispositivos/:dispoId', dispositivosController.actualizar)
    .get('/dispositivos', dispositivosController.listar)

  // Reportes
    .post('/reportes', reportesController.nuevoReporte)
    .get('/reportes', reportesController.listar)
    .get('/reportes/new', reportesController.crearNuevoReporte)
    .get('/reportes/:reporteId', reportesController.detalleReporte);
    // TODO: Borrar? editar?
};
