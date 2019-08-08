const _ = require('lodash');

module.exports = function dispositivosService(
  dispositivosRepository,
  reportesRepository,
  sessionId, lock,
  medicionEnCurso
) {
  return {
    nuevo,
    notificar,
    getReporte
  };

  function getReporte(reporteId) {
    return medicionEnCurso;// reportesRepository.getReporte(reporteId);
  }

  async function notificar(dispoId, medicion) {
    await lock.acquire();
    // const response = await reportesRepository.getByDispoId(dispoId);
    // console.log('ss');


    console.log(medicionEnCurso);


    // SUMATORIA DE MEDICONES MAXIMAS NO FUNCIONA
    if (medicionEnCurso && medicionEnCurso.fin > Date.now()) {
      const medicionMaximaVieja = _.get(medicionEnCurso, `mediciones.${dispoId}.medicionMaxima`, 0);
      const medicionMaxima = Math.max(medicionMaximaVieja, medicion);
      medicionEnCurso.mediciones[dispoId].medicion = medicion;
      const maxActual = _.sum(Object.keys(medicionEnCurso.mediciones).map(medicionInt => (medicionInt.medicion || 0)));
      const medicionMaximaTotal = Math.max((medicionEnCurso.medicionMaxima || 0), maxActual);

      const contadorMedicionesTotal = _.get(medicionEnCurso, 'contadorMediciones', 0) + 1;
      const contadorMediciones = _.get(medicionEnCurso, `mediciones.${dispoId}.contadorMediciones`, 0) + 1;
      console.log(contadorMediciones);

      const promedioMedicionesTotal = ((_.get(medicionEnCurso, 'promedioMediciones', 0) * (contadorMedicionesTotal - 1)) + medicion) / contadorMedicionesTotal;
      const promedioMediciones = ((_.get(medicionEnCurso, `mediciones.${dispoId}.promedioMediciones`, 0) * (contadorMediciones - 1)) + medicion) / contadorMediciones;

      medicionEnCurso = {
        ...medicionEnCurso,
        medicionMaxima: medicionMaximaTotal,
        contadorMediciones: contadorMedicionesTotal,
        promedioMediciones: promedioMedicionesTotal
      };

      console.log(dispoId);

      medicionEnCurso.mediciones[dispoId] = {
        ...medicionEnCurso.mediciones[dispoId],
        medicion,
        medicionMaxima,
        promedioMediciones,
        contadorMediciones
      };

      medicionEnCurso.mediciones[dispoId].data.push(
        {
          offset: parseInt(Date.now() - medicionEnCurso.inicio),
          medicion
        }
      );


    /*
      await reportesRepository.pushMedicion();

      */
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
    // const ultimasMediciones = Array(Object.keys(mediciones).length).fill(0);

    medicionEnCurso = {
      nombre,
      duracion,
      mediciones,
      inicio,
      fin,
      sessionId
      // ,ultimasMediciones
    };

    /*
    await reportesRepository.upsert(reporteId, {
      nombre,
      duracion,
      mediciones,
      inicio,
      fin,
      sessionId,
      ultimasMediciones
    });

  */
    return reporteId;
  }
};
