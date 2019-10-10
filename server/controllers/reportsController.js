module.exports = function reportsController(sensorsService, reportsService, tempReport) {
  return {
    toList,
    createNewReport,
    reportDetails,
    newReport,
    deleteReport
  };

  async function deleteReport(req, res) {
    const reportId = req.params.reportId;
    await reportsService.del(reportId);
    res.status(200).send();
  }

  async function newReport(req, res) {
    // TODO

    const name = req.body.name;
    // eslint-disable-next-line radix
    const secondsDuration = parseInt(req.body.duracion);
    const meditions = [];

    const timeStart = req.body.timeStart;

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
      meditions,
      timeStart
    });

    res.redirect(`/reportes/${reportId}/`);
  }

  async function reportDetails(req, res) {
    // TODO
    try {
      const reportId = req.params.reportId;
      const report = await reportsService.getReport(reportId);
      // raise error if report only has now key and rescrue with catch block
      (req.query.format === 'json') ? res.json(report) : res.render('report', { report });
    }
    catch (e) {
      const report = await reportsService.lastReport();
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

    if (reportsService.isTemp()) {
      res.redirect('/reportes/temp');
      return;
    }

    const sensors = (await sensorsService.list()).filter(
      sensor => sensor.isOnline
    );

    res.render('newReport', { sensors });
  }

  async function toList(req, res) {
    let reports = await reportsService.list();
    if (req.query.abort === 'true') {
      reportsService.eraseTemp();
    }
    reports = reports.map(report => ({
      ...report,
      date: calculateDate(report)
    }));
    //  console.log(reports)
    res.render('reports', { reports });
  }

  function calculateDate(report) {
    const f = new Date(report.timeStart - 0);
    return f.toLocaleString('es-ES',{timeZone: "America/Argentina/Buenos_Aires"});
    //  return f.getHours() + ":" + f.getMinutes() + "  " + f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear()
  }
};
