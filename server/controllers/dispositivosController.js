module.exports = function dispositivosController(dispositivosService) {
  return {
    report,
    toList,
    update,
    borrar
  };

  async function update(req, res) {
    await dispositivosService.update(req.params.dispoId, req.body.name);
    res.status(200).send();
  }

  async function borrar(req, res) {
    await dispositivosService.borrar(req.params.dispoId);
    res.status(200).send();
  }

  async function report(req, res) {
    await dispositivosService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  async function toList(req, res) {
    const dispositivos = await dispositivosService.list();
    if (req.query.format === 'json') {
      res.json(dispositivos);
    } else {
      res.render('dispositivos', { dispositivos });
    }
  }
};
