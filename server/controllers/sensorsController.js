module.exports = function sensorsController(sensorsService) {
  return {
    report, toList, update, borrar
  };

  // PUT :base_url/dispositivos/:dispoId
  async function update(req, res) {
    const name = req.body.name;
    const sensorId = req.params.sensorId;
    await sensorsService.update(sensorId, name);
    res.status(200).send();
  }

  // DELETE :base_url/dispositivos/:dispoId
  async function borrar(req, res) {
    const sensorId = req.params.sensorId;
    await sensorsService.del(sensorId);
    res.status(200).send();
  }

  // POST :base_url/dispositivos/:dispoId/report
  async function report(req, res) {
    if (process.env.SHOW_CONSOLE_LOGS === true) logSensor(req.body);
    sensorsService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  // GET :base_url/dispositivos
  async function toList(req, res) {
    const sensors = await sensorsService.list();
    if (req.query.format === 'json') {
      res.json(sensors);
    } else {
      res.render('sensors', { sensors });
    }
  }

  function logSensor(reqBody) {
    const medition = reqBody.medition;
    console.log('[Medido  sensor: **** '
                + `Sensor: *** , Medicion: ${medition}`);
  }
};
