const _ = require('lodash');

module.exports = function devicesService(
  devicesRepository,
  reportsRepository,
  sessionId, lock,
  medicionEnCurso
) {
  return {
    nuevo,
    notify,
    getReport,
    list
  };

  function getReport(reportId) {
    return { now: Date.now(), ...medicionEnCurso };// reportsRepository.getReport(reportId);
  }

  async function notify(dispoId, medicion) {
    await lock.acquire();

    const perteneceAlReport = _.get(medicionEnCurso, `mediciones.${dispoId}`);



    // Finalizo
    if (perteneceAlReport && medicionEnCurso && medicionEnCurso.fin < Date.now()) {


      console.log(medicionEnCurso)
      /*
      guardarMedicion(medicionEnCurso);
      medicionEnCurso = null;
      await lock.release();
      return;
      */

    }

    if (perteneceAlReport && medicionEnCurso && medicionEnCurso.fin > Date.now()) {
      const medicionMaximaVieja = _.get(medicionEnCurso, `mediciones.${dispoId}.medicionMaxima`, 0);
      const medicionMaxima = Math.max(medicionMaximaVieja, medicion);
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
    const reportId = randomId();

    medicionEnCurso = {
      reportId,
      nombre,
      duracion,
      mediciones,
      inicio,
      fin,
      sessionId
    };


    return reportId;
  }

  async function list() {
    mock = [
      {
        reportId:"123",
        nombre: 'Cocina',
        duracion: 90,
        mediciones: {
        medidor1: { index: 0, nombreMedicion: 'medicion1', dispoId: 'medidor1', data: [] },
        medidor2: { index: 1, nombreMedicion: 'medicion2', dispoId: 'medidor2', data: [] }
      },
      inicio: 1565223068401,
      fin: 1595223968401,
      sessionId: '4oy0xej',
      currentConsumption: 100,
      averageConsumption: 80,
      maximumConsumption: 140
    }, 
    {
      reportId:"1234",
      nombre: 'Comedor',
      duracion: 180,
      mediciones: {
      medidor1: { index: 0, nombreMedicion: 'medicion1', dispoId: 'medidor1', data: [] },
      medidor2: { index: 1, nombreMedicion: 'medicion2', dispoId: 'medidor2', data: [] }
    },
    inicio: 1565223068401,
    fin: 1595223968401,
    sessionId: '4oy0xek',
    currentConsumption: 80,
    averageConsumption: 40,
    maximumConsumption: 120
  }, 
  {
    reportId:"12345",
    nombre: 'Pieza',
    duracion: 360,
    mediciones: {
    medidor1: { index: 0, nombreMedicion: 'medicion1', dispoId: 'medidor1', data: [] },
    medidor2: { index: 1, nombreMedicion: 'medicion2', dispoId: 'medidor2', data: [] }
  },
  inicio: 1565223068401,
  fin: 1595223968401,
  sessionId: '4oy0xel',
  currentConsumption: 120,
  averageConsumption: 100,
  maximumConsumption: 180
}];
    return mock;
  }
};
