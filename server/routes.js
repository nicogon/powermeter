const express = require('express');

module.exports = function routes(homeController, dispositivosController) {
  return (express
    .Router()
    .get('/', homeController.mainHome)
    .post('/dispositivos/:dispoId/report', dispositivosController.report)
    .get('/dispositivos', dispositivosController.listar));
};
