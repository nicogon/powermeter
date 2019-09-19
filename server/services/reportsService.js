const _ = require('lodash');

module.exports = function devicesService(
  devicesRepository,
  reportsRepository,
  sessionId,
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
    //await lock.acquire();

    console.log(medicionEnCurso)
    let medicionAMofidicar = medicionEnCurso.mediciones.find(medicion=>medicion.dispoId == dispoId)
    
    // Finalizo
    if (medicionAMofidicar && medicionEnCurso && medicionEnCurso.fin < Date.now()) {


      /*
      guardarMedicion(medicionEnCurso);
      medicionEnCurso = null;
      await lock.release();
      return;
      */

    }

    if (medicionAMofidicar && medicionEnCurso && medicionEnCurso.fin > Date.now()) {
      const medicionMaximaVieja = medicionAMofidicar.medicionMaxima || 0;
      const medicionMaxima = Math.max(medicionMaximaVieja, medicion);
      const sumatoriaMedicion = _.sum(medicionEnCurso.mediciones.map(medicionInt => (medicionInt.medicion || 0)));
      const medicionMaximaTotal = Math.max((medicionEnCurso.medicionMaxima || 0), sumatoriaMedicion);


      const contadorMedicionesTotal = _.get(medicionEnCurso, 'contadorMediciones', 0) + 1;
      const contadorMediciones = medicionAMofidicar.contadorMediciones || 0 + 1;
      const medicionPromedioTotal = _.round((((_.get(medicionEnCurso, 'medicionPromedio', 0) * (contadorMedicionesTotal - 1)) + sumatoriaMedicion) / contadorMedicionesTotal), 1);
      const medicionPromedio = _.round((((medicionAMofidicar.medicionPromedio || 0 * (contadorMediciones - 1)) + medicion) / contadorMediciones), 1);

      medicionEnCurso = {
        ...medicionEnCurso,
        sumatoriaMedicion,
        medicionMaxima: medicionMaximaTotal,
        contadorMediciones: contadorMedicionesTotal,
        medicionPromedio: medicionPromedioTotal
      };

      medicionAMofidicar = {
        ...medicionAMofidicar,
        medicion,
        medicionMaxima,
        medicionPromedio,
        contadorMediciones
      };

      medicionAMofidicar.data.push(
        {
          offset: parseInt(Date.now() - medicionEnCurso.inicio),
          medicion
        }
      );
    }
  //  await lock.release();
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

    const medicion = 0;
    
    medicionEnCurso = {
      reportId,
      medicion,
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
        reportId: "123",
        nombre: 'Cocina',
        duracion: 90,
        inicio: 1565223068401,
        fin: 1595223968401,
        sessionId: '4oy0xej',
        currentConsumption: 100,
        averageConsumption: 80, //Es necesario? Quizas..
        maximumConsumption: 140,
        mediciones: [
          {
            index: 0,
            nombreMedicion: 'Microondas',
            dispoId: 'deviceRed',
            data: [],
            // currentConsumption: 100,
            duration: 60,
            averageConsumption: 80
            // maximumConsumption: 140
          },
          {
            index: 1,
            nombreMedicion: 'Heladera',
            dispoId: 'deviceBlue',
            data: [],
            // currentConsumption: 100,
            duration: 60,
            averageConsumption: 100
            // maximumConsumption: 140
          }]
      },
      {
        reportId: "1234",
        nombre: 'Comedor',
        duracion: 180,
        inicio: 1565223068401,
        fin: 1595223968401,
        sessionId: '4oy0xek',
        currentConsumption: 80,
        averageConsumption: 40,
        maximumConsumption: 120,
        mediciones: [
          {
            index: 0,
            nombreMedicion: 'Televisor',
            dispoId: 'deviceRed',
            data: [],
            // currentConsumption: 100,
            duration: 60,
            averageConsumption: 80
            // maximumConsumption: 140
          },
          {
            index: 1,
            nombreMedicion: 'Aire acondicionado',
            dispoId: 'deviceBlue',
            data: [],
            // currentConsumption: 100,
            averageConsumption: 30,
            duration: 60
            // maximumConsumption: 140 
          }
        ]
      },
      {
        reportId: "12345",
        nombre: 'Pieza',
        duracion: 360,
        inicio: 1565223068401,
        fin: 1595223968401,
        sessionId: '4oy0xel',
        currentConsumption: 120,
        averageConsumption: 100,
        maximumConsumption: 180,
        mediciones: [
          {
            index: 0,
            nombreMedicion: 'Lampara',
            dispoId: 'deviceRed',
            data: [],
            duration: 60,
            // currentConsumption: 100,
            averageConsumption: 50
            // maximumConsumption: 140
          },
          {
            index: 1,
            nombreMedicion: 'Televisor',
            dispoId: 'deviceBlue',
            data: [],
            duration: 60,
            // currentConsumption: 100,
            averageConsumption: 180
            // maximumConsumption: 140
          }
        ]
      }];
    return mock;
  }
};