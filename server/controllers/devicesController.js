// TODO: Quiero que se puedan incluir modulos con el inyector de dependencias.
const Device = require('../models').Device;

module.exports = function devicesController(devicesService) {
  return {
    report, toList, update, borrar
  };

  // PUT :base_url/dispositivos/:dispoId
  async function update(req, res) {
    findDevice(req).then(device => device.update({ name: req.body.name }));
    res.status(200).send();
  }

  // DELETE :base_url/dispositivos/:dispoId
  async function borrar(req, res) {
    findDevice(req).then(device => device.destroy());
    res.status(200).send();
  }

  // POST :base_url/dispositivos/:dispoId/report
  async function report(req, res) {
    // TODO: Pending reports model join
    devicesService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  // GET :base_url/dispositivos
  async function toList(req, res) {
    const devices = await Device.findAll({ raw: true }).map(device => adaptDevice(device));
    if (req.query.format === 'json') {
      res.json(devices);
    } else {
      res.render('devices', { devices });
    }
  }

  function adaptDevice(device) {
    const { name } = device;
    return { name };
  }

  function findDevice(req) {
    Device.findByPk(req.params.dispoId);
  }
};
