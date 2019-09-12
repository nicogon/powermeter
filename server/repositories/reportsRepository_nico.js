module.exports = function reportsRepository() {
  return {
    list,
    del,
    saveReport,
    getReport
  };

  async function saveReport(report) {}

  async function del(reportId) {}

  async function getReport(reportId) {}

  async function list() {}
};
