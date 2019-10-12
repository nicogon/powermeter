/* eslint-disable no-await-in-loop */
/* eslint-disable radix */
module.exports = function reportsRepository(Report, Medition) {
  return {
    list,
    del,
    saveReport,
    getReport,
    listForSimulations,
    getMedition,
    last
  };

  async function del(reportId) {
    return Report.destroy({
      where: {
        id: reportId
      }
    });
  }

  async function createMeditions(newReport, idReport) {
    // eslint-disable-next-line no-restricted-syntax
    for (const medition of newReport.meditions) {
      // eslint-disable-next-line no-await-in-loop
      await Medition.create(
        { ...medition, ReportId: idReport },
        {}
      );
    }
  }

  async function saveReport(newReport) {
    try {
      const createdReport = await Report.create(newReport, {}).catch(
        console.log
      );
      const idReport = createdReport.toJSON().id;
      await createMeditions(newReport, parseInt(idReport));
      return idReport;
    } catch (e) {
      console.log(e);
    }
  }

  async function getReport(reportId) {
    const report = await Report.findByPk(parseInt(reportId), {
      include: [
        {
          model: Medition,
          as: 'meditions'
        }
      ],

      raw: false
    });

    return report.toJSON();
  }

  async function list() {
    const response = await Report.findAll({});
    return response.map(a => a.toJSON());
  }

  async function listForSimulations() {
    const response = await Report.findAll({
      include: [
        {
          model: Medition,
          as: 'meditions'
        }
      ]
    });
    return response.map(a => a.toJSON());
  }

  async function getMedition(meditionId) {
    const medition = await Medition.findByPk(parseInt(meditionId), {
      raw: false
    });
    return medition.toJSON();
  }

  async function last() {
    const lastReport = await Report.findAll({
      limit: 1,
      order: [['id', 'DESC']],
      include: [{ model: Medition, as: 'meditions' }]
    }).map(report => report.get({ plain: true }));
    return lastReport[0];
  }
};
