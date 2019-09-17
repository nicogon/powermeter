module.exports = function devicesController(devicesService) {
  return {
    report,
    toList,
    update,
    borrar
  };

  async function update(req, res) {
    await devicesService.update(req.params.dispoId, req.body.name);
    res.status(200).send();
  }

  async function borrar(req, res) {
    await devicesService.borrar(req.params.dispoId);
    res.status(200).send();
  }

  async function report(req, res) {
    await devicesService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  async function toList(req, res) {
    const devices = await devicesService.list();
    if (req.query.format === 'json') {
      res.json(devices);
    } else {
      res.render('devices', { devices });
    }
  }
};
