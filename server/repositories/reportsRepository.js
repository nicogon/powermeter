module.exports = function reportsRepository(Report, Medition, PuntualMedition) {
  return {
    list,
    del,
    saveReport,
    getReport
  };

  function createPuntualMeditions(puntualMeditions, MeditionId) {
    puntualMeditions.forEach((element) => {
      // eslint-disable-next-line no-param-reassign
      console.log(MeditionId)
      PuntualMedition.create({ ...element, MeditionId });
    });
  }

  async function createMeditions(newReport, idReport) {
    // eslint-disable-next-line no-restricted-syntax
    for (const medition of newReport.meditions) {
      // eslint-disable-next-line no-await-in-loop
      const createdMedition = await Medition.create({ ...medition, ReportId:idReport }, {});
      console.log('id medicion:', createdMedition.toJSON().id);
      createPuntualMeditions(medition.puntualMeditions, parseInt(createdMedition.toJSON().id));
    }
  }

  async function saveReport(newReport) {
    try {
      const createdReport = await Report.create(newReport, {}).catch(console.log);
      const idReport = createdReport.toJSON().id;
      await createMeditions(newReport, parseInt(idReport));

      //   createPuntualMeditions(newReport,idReport);
    } catch (e) { console.log(e); }

  //  console.log('sss');
    // å   console.log(pepe, 'asdasd');
  }

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
