module.exports = function dispositivosService(
  dispositivosRepository,
  reportesRepository,
  sessionId
) {
  return {
    nuevo,
    notificar,
    getReporte
  };

  function getReporte(reporteId) {
    return reportesRepository.getReporte(reporteId);
  }

  async function notificar(dispoId, medicion) {
    const response = await reportesRepository.getByDispoId(dispoId);
    console.log("ss")
    console.log(response)
    if (response) {
      reportesRepository.pushMedicion({
        reporteId: response.reporteId, dispoId, medicion, inicio: response.inicio
      });
    }
  }
  function randomId() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

  async function nuevo({
    nombre, duracion, mediciones, inicio, fin
  }) {
    const reporteId = randomId();
    await reportesRepository.upsert(reporteId, {
      nombre, duracion, mediciones, inicio, fin, sessionId
    });
    return reporteId;
  }
};
