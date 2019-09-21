module.exports = function reportsController(
  sensorsService,
  reportsService
) {
  return {
    toList,
    createNewReport,
    reportDetails,
    newReport
  };

  async function newReport(req, res) {
    // TODO

    const nombre = req.body.nombre;
    // eslint-disable-next-line radix
    const duracion = parseInt(req.body.duracion);
    const mediciones = [];
    const medicion = 0;

    if (typeof req.body.nombreMedicion === 'string') {
      mediciones.push({
        id: req.body.dispoId,
        medicion,
        nombreMedicion: req.body.nombreMedicion,
        data: [],
        index: 0
      })

    } else {
      const medicion = 0;
      req.body.dispoId.forEach((dispoId, index) => {
        mediciones.push({
          index,
          medicion,
          nombreMedicion: req.body.nombreMedicion[index],
          id:dispoId,
          data: []
        });
      });
    }
    const inicio = Date.now();
    const fin = Date.now() + duracion;

    const reportId = await reportsService.nuevo({
      nombre,
      duracion,
      mediciones,
      inicio,
      fin
    });

    res.redirect(`/reportes/${reportId}/`);
  }

  async function reportDetails(req, res) {
    // TODO
    const reportId = req.params.reportId;
    const report = await reportsService.getReport(reportId);

    if (req.query.format === 'json') {
      res.json({ ...report, mediciones: Object.values(report.mediciones) });
    } else {
      res.render('report', { report });
    }
  }

  // refactolizar, cambiar nombre es confuso
  async function createNewReport(req, res) {
    // TODO
    /*
    const name = req.body.name;
    const duracion = req.body.duracion;
    const devices = req.body.medition((medition) => {});
*/

    const sensors = (await sensorsService.list()).filter(
      sensor => sensor.isOnline
    );

    res.render('newReport', { sensors });
  }

  async function toList(req, res) {
    const reports = (await reportsService.list());
    res.render('reports', { reports });
  }
};
