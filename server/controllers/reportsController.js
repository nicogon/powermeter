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

    const name = req.body.name;
    // eslint-disable-next-line radix
    const secondsDuration = parseInt(req.body.duracion);
    const meditions = [];

    if (typeof req.body.nombreMedicion === 'string') {
      meditions.push({
        dispoId: req.body.dispoId,
        name: req.body.nombreMedicion,
        puntualMeditions: []
      });
    } else {
      const medicion = 0;
      req.body.dispoId.forEach((dispoId, index) => {
        meditions.push({
          medicion,
          name: req.body.nombreMedicion[index],
          dispoId,
          puntualMeditions: []
        });
      });
    }

    const reportId = await reportsService.nuevo({
      name,
      secondsDuration,
      meditions
    });

    res.redirect(`/reportes/${reportId}/`);
  }

  async function reportDetails(req, res) {
    // TODO
    const reportId = req.params.reportId;
    const report = await reportsService.getReport(reportId);

    if (req.query.format === 'json') {
      res.json(report);
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
    const meditions = req.body.medition((medition) => {});
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
