module.exports = function reportesController(dispositivosService) {
  return {
    listar, nuevo, detalleReporte
  };

  async function detalleReporte(req, res) {
    // TODO
    res.status(200).send();
  }

  async function nuevo(req, res) {
    // TODO
    res.render('nuevoReporte', { });
  }

  async function listar(req, res) {
    // const dispositivos = await dispositivosService.list();
    res.render('reportes', { });
  }
};
