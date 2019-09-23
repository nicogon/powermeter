/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
module.exports = function reportsRepository(Report, Medition, PuntualMedition) {
  return {
    list,
    del,
    saveReport,
    getReport
  };

  async function createPuntualMeditions(puntualMeditions, MeditionId) {
    // eslint-disable-next-line no-restricted-syntax
    for (const element of puntualMeditions) {
      await PuntualMedition.create({ ...element, MeditionId });
    }
  }

  async function createMeditions(newReport, idReport) {
    // eslint-disable-next-line no-restricted-syntax
    for (const medition of newReport.meditions) {
      // eslint-disable-next-line no-await-in-loop
      const createdMedition = await Medition.create({ ...medition, ReportId: idReport }, {});
      await createPuntualMeditions(medition.puntualMeditions, parseInt(createdMedition.toJSON().id));
    }
  }

  async function saveReport(newReport) {
    try {
      const createdReport = await Report.create(newReport, {}).catch(console.log);
      const idReport = createdReport.toJSON().id;
      await createMeditions(newReport, parseInt(idReport));
    } catch (e) { console.log(e); }
  }

  /*

    async function saveReport(newReport) {
    return Report.create(newReport, {
      include: [{
        model: Medition,
        as: 'meditions',
        include: [{ model: PuntualMedition, as: 'puntualMeditions' }]
      }]
    }).catch(console.log);
  }

  */

  async function del(reportId) {}

  async function getReport(reportId) {
    const report = await Report.findByPk(parseInt(reportId), {
      include: [{
        model: Medition,
        as: 'meditions',
        include: [{ model: PuntualMedition, as: 'puntualMeditions' }]
      }],

      raw: false
    });

    return report.toJSON();
  }

  async function list() {
    const response = await Report.findAll({});
    return response.map(a => a.toJSON());
  }
};
