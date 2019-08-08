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

    console.log(medicionEnCurso);
    const perteneceAlReporte = _.get(medicionEnCurso, `mediciones.${dispoId}`);

    if (perteneceAlReporte && medicionEnCurso && medicionEnCurso.fin > Date.now()) {
      const medicionMaximaVieja = _.get(medicionEnCurso, `mediciones.${dispoId}.medicionMaxima`, 0);
      const medicionMaxima = Math.max(medicionMaximaVieja, medicion);
      medicionEnCurso.mediciones[dispoId].medicion = medicion;
      // console.log(Object.values(medicionEnCurso.mediciones))
      const sumatoriaMedicion = _.sum((Object.values(medicionEnCurso.mediciones)).map(medicionInt => (medicionInt.medicion || 0)));
      const medicionMaximaTotal = Math.max((medicionEnCurso.medicionMaxima || 0), sumatoriaMedicion);


      const contadorMedicionesTotal = _.get(medicionEnCurso, 'contadorMediciones', 0) + 1;
      const contadorMediciones = _.get(medicionEnCurso, `mediciones.${dispoId}.contadorMediciones`, 0) + 1;
      const medicionPromedioTotal = _.round((((_.get(medicionEnCurso, 'medicionPromedio', 0) * (contadorMedicionesTotal - 1)) + sumatoriaMedicion) / contadorMedicionesTotal), 1);
      const medicionPromedio = _.round((((_.get(medicionEnCurso, `mediciones.${dispoId}.medicionPromedio`, 0) * (contadorMediciones - 1)) + medicion) / contadorMediciones), 1);

      medicionEnCurso = {
        ...medicionEnCurso,
        sumatoriaMedicion,
        medicionMaxima: medicionMaximaTotal,
        contadorMediciones: contadorMedicionesTotal,
        medicionPromedio: medicionPromedioTotal
      };

      medicionEnCurso.mediciones[dispoId] = {
        ...medicionEnCurso.mediciones[dispoId],
        medicion,
        medicionMaxima,
        medicionPromedio,
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
    } else if (medicionEnCurso.fin < Date.now()) {

      // aca hacer que el reporte termino, persistirlo?

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
