const express = require('express');

module.exports = function routes(homeController, dispositivosController) {
  return express
    .Router()
    .get('/', homeController.mainHome)
    .post('/dispositivos/:dispoId/report', dispositivosController.report)
    .delete('/dispositivos/:dispoId', dispositivosController.borrar)
    .put('/dispositivos/:dispoId', dispositivosController.actualizar)
    .get('/dispositivos', dispositivosController.listar);
};
