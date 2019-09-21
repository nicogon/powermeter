module.exports = function devicesController(devicesService, Device, PuntualMedition, Sensor) {
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
   // persistMedition(req.body);
    if (process.env.SHOW_CONSOLE_LOGS === true) logMedition(req.body);
    devicesService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  // GET :base_url/dispositivos
  async function toList(req, res) {
    const devices = await devicesService.list();
    console.log(devices)
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

  function persistMedition(requestBody) {
    Device.findOrCreate({ where: requestBody.device });
    Sensor.findOrCreate({
      where: requestBody.sensor,
      defaults: { deviceId: requestBody.device.id }
    });
    PuntualMedition.create({ value: requestBody.medition.value, deviceId: requestBody.device.id });
  }

  function logMedition(reqBody) {
    const deviceId = reqBody.device.id;
    const sensorId = reqBody.sensor.id;
    const medition = reqBody.medition.value;
    console.log(`[Medido y persistido] Device: ${deviceId}, `
                + `Sensor: ${sensorId}, Medicion: ${medition}`);
  }
};
