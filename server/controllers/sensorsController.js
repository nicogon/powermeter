module.exports = function sensorsController(sensorsService, Medition, PuntualMedition, Sensor) {
  return {
    report, toList, update, borrar
  };

  // PUT :base_url/dispositivos/:dispoId
  async function update(req, res) {
    findMedition(req).then(medition => medition.update({ name: req.body.name }));
    res.status(200).send();
  }

  // DELETE :base_url/dispositivos/:dispoId
  async function borrar(req, res) {
    findMedition(req).then(medition => medition.destroy());
    res.status(200).send();
  }

  // POST :base_url/dispositivos/:dispoId/report
  async function report(req, res) {
    // persistMedition(req.body);
    if (process.env.SHOW_CONSOLE_LOGS === true) logSensor(req.body);
    sensorsService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  // GET :base_url/dispositivos
  async function toList(req, res) {
    const repepe = {
      name: 'Heladera',
      duration: 'hora',
      average_medition: 1,
      maximum_medition: 2,
      sensor: { id: 1 }
    };

    // const re =  await Medition.create(repepe);

    // console.log(re)
    /*
    const pepe = await Medition.findByPk(2,{


      include: [{
        model: Sensor,
         as: 'sensor',
         attributes: ['id']
    //  required: false
       }],

      raw: false });
    console.log(pepe.toJSON()) */
    const sensors = await sensorsService.list();
    console.log(sensors);
    if (req.query.format === 'json') {
      res.json(sensors);
    } else {
      res.render('sensors', { sensors });
    }
  }

  /*
  function adaptMedition(medition) {
    const { name } = medition;
    return { name };
  }

  function findMedition(req) {
    Medition.findByPk(req.params.dispoId);
  }


  function persistMedition(requestBody) {
    Medition.findOrCreate({ where: requestBody.medition });
    Sensor.findOrCreate({
      where: requestBody.sensor,
      defaults: { meditionId: requestBody.medition.id }
    });
    PuntualMedition.create({ value: requestBody.medition.value, meditionId: requestBody.medition.id });
  }

  */

  function logSensor(reqBody) {
    const medition = reqBody.medition;
    console.log('[Medido  sensor: **** '
                + `Sensor: *** , Medicion: ${medition}`);
  }
};
