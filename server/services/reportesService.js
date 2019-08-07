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
    console.log('ss');
    console.log(response);
    if (response && response.fin > Date.now()) {
      const medicionMaximaVieja = (response[dispoId] && response[dispoId].medicionMaxima) || 0;
      const medicionMaxima = Math.max(medicionMaximaVieja, medicion);
      const maxActual = Math.max(...(response.ultimasMediciones));
      const medicionMaximaTotal = Math.max(response.medicionMaxima, maxActual);

      reportesRepository.pushMedicion({
        index: Object.keys(response.mediciones).indexOf(dispoId),
        reporteId: response.reporteId,
        dispoId,
        medicion,
        inicio: response.inicio,
        medicionMaximaTotal,
        contadorMedicionesTotal: (response.contadorMediciones || 0 + 1),
        sumatoriaMedicionesTotal: (response.sumatoriaMediciones || 0 + medicion),
        medicionMaxima,
        sumatoriaMediciones: (response.sumatoriaMediciones || 0 + medicion),
        contadorMediciones: (response.contadorMediciones || 0 + 1)
      });
    }
  }
  function randomId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);
  }

  async function nuevo({
    nombre, duracion, mediciones, inicio, fin
  }) {
    const reporteId = randomId();
    const ultimasMediciones = Array(Object.keys(mediciones).length).fill(0);
    await reportesRepository.upsert(reporteId, {
      nombre,
      duracion,
      mediciones,
      inicio,
      fin,
      sessionId,
      ultimasMediciones
    });
    return reporteId;
  }
};
