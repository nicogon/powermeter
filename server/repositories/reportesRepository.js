module.exports = function reportesRepository() {
  return {
    list,
    del,
    saveReporte,
    getReporte
  };

  async function saveReporte(reporte) {}

  async function del(reporteId) {}

  async function getReporte(reporteId) {}

  async function list() {}
};
