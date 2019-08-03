module.exports = function dispositivosService(
  dispositivosRepository,
  reportesRepository,
  sessionId
) {
  return {
    nuevo,
    notificar
  };

  async function notificar(dispoId, medicion) {
    const response = await reportesRepository.getByDispoId(dispoId);
    if (response) {
      reportesRepository.pushMedicion({
        reporteId: response.reporteId, dispoId, medicion, timeStamp: Date.now()
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
