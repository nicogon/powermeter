const _ = require('lodash');

module.exports = function dispositivosService(
  dispositivosRepository,
  reportesRepository,
  sessionId, lock
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
    await lock.acquire();
    const response = await reportesRepository.getByDispoId(dispoId);
    console.log('ss');
    console.log(response);


    // SUMATORIA DE MEDICONES MAXIMAS NO FUNCIONA
    if (response && response.fin > Date.now()) {
      const medicionMaximaVieja = _.get(response, `mediciones.${dispoId}.medicionMaxima`, 0);
      const medicionMaxima = Math.max(medicionMaximaVieja, medicion);
      response.ultimasMediciones[response.mediciones[dispoId].index] = medicion;
      const maxActual = _.sum(response.ultimasMediciones);
      const medicionMaximaTotal = Math.max((response.medicionMaxima || 0), maxActual);

      const contadorMedicionesTotal = _.get(response, 'contadorMediciones', 0) + 1;
      const contadorMediciones = _.get(response, `mediciones.${dispoId}.contadorMediciones`, 0) + 1;
      console.log(contadorMediciones);

      const promedioMedicionesTotal = ((_.get(response, 'promedioMediciones', 0) * (contadorMedicionesTotal - 1)) + medicion) / contadorMedicionesTotal;
      const promedioMediciones = ((_.get(response, `mediciones.${dispoId}.promedioMediciones`, 0) * (contadorMediciones - 1)) + medicion) / contadorMediciones;

      await reportesRepository.pushMedicion({
        index: response.mediciones[dispoId].index,
        reporteId: response.reporteId,
        dispoId,
        medicion,
        inicio: response.inicio,
        medicionMaximaTotal,
        contadorMedicionesTotal,
        promedioMedicionesTotal,
        medicionMaxima,
        promedioMediciones,
        contadorMediciones
      });

    }
    await lock.release();

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
