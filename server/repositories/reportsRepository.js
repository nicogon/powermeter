module.exports = function reportsRepository(Report) {
  return {
    list,
    del,
    saveReport,
    getReport
  };

  async function saveReport(newReport) {
   return Report.create(newReport).catch(console.log);
  }

  async function del(reportId) {}

  async function getReport(reportId) {}

  async function list() {}
};
