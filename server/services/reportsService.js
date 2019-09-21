/* eslint-disable max-len */

const _ = require('lodash');

module.exports = function reportsService(
  sensorsRepository,
  reportsRepository,
  sessionId,
  tempReport
) {
  return {
    nuevo,
    notify,
    getReport,
    list
  };

  function getReport(reportId) {
    return { now: Date.now(), ...tempReport };// reportsRepository.getReport(reportId);
  }

  async function notify(sensorId, meditionValue) {
    // await lock.acquire();

    console.log(sensorId, meditionValue)

    if (process.env.SHOW_CONSOLE_LOGS === true) console.log(tempReport);

    // Buscar si existe una medicion asociada a un sensor
    let activeMedition = tempReport.mediciones.find(medition => medition.id === sensorId);


    // Si la medicion finalizo, borrar el objeto temporal de la memoria
    if (hasFinish()) { 
      saveReport();
    }

    if(activeMedition){
      updateActiveAndMaxMeditions(activeMedition, meditionValue);
    }

    //  await lock.release();
  }

  function hasFinish() {
    return tempReport && tempReport.fin < Date.now();
  }

  function saveReport() {
    // TODO
    tempReport = null;
  }

  function updateActiveAndMaxMeditions(activeMedition, medicion) {
    updateTemporalReport();
    modifyMedition(activeMedition, medicion);
  }

  function updateTemporalReport() {
    const averageConsumption = _.sum(tempReport.mediciones.map(medicionInt => (medicionInt.consumption || 0)));
    const maximumConsumption = Math.max((tempReport.maximumConsumption || 0), averageConsumption);
    const contadorMedicionesTotal = _.get(tempReport, 'contadorMediciones', 0) + 1;
    const medicionPromedioTotal = _.round((((_.get(tempReport, 'averageConsumption', 0) * (contadorMedicionesTotal - 1)) + maximumConsumption) / contadorMedicionesTotal), 1);

    // eslint-disable-next-line no-param-reassign
    tempReport = {
      ...tempReport,
      averageConsumption,
      maximumConsumption,
      contadorMediciones: contadorMedicionesTotal,
      medicionPromedio: medicionPromedioTotal
    };

    return tempReport;
  }

  function modifyMedition(medicionAMofidicar, medition) {
    const medicionMaximaVieja = medicionAMofidicar.maximumConsumption || 0;
    const maximumConsumption = Math.max(medicionMaximaVieja, medition);
    const contadorMediciones = medicionAMofidicar.contadorMediciones || 0 + 1;
    const averageConsumption = _.round((((medicionAMofidicar.averageConsumption || 0 * (contadorMediciones - 1)) + medition) / contadorMediciones), 1);

    // eslint-disable-next-line no-param-reassign
    medicionAMofidicar = {
      ...medicionAMofidicar, medition, maximumConsumption, averageConsumption, contadorMediciones
    };

    medicionAMofidicar.data.push({ offset: parseInt(Date.now() - tempReport.inicio, _), medition });
    return medicionAMofidicar;
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
   // const reportId = randomId();

    const medicion = 0;

    tempReport = {
      currentMedition,
      nombre,
      duration,
      mediciones,
      inicio,
      fin
    };


    return 'temp';
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
            dispoId: 'meditionRed',
            data: [],
            idMedicion: '1',
            // currentConsumption: 100,
            duration: 60,
            averageConsumption: 80
            // maximumConsumption: 140
          },
          {
            index: 1,
            nombreMedicion: 'Heladera',
            dispoId: 'meditionBlue',
            data: [],
            idMedicion: '2',
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
            dispoId: 'meditionRed',
            data: [],
            // currentConsumption: 100,
            duration: 60,
            idMedicion: '3',
            averageConsumption: 80
            // maximumConsumption: 140
          },
          {
            index: 1,
            nombreMedicion: 'Aire acondicionado',
            dispoId: 'meditionBlue',
            data: [],
            // currentConsumption: 100,
            idMedicion: '4',
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
            dispoId: 'meditionRed',
            data: [],
            duration: 60,
            idMedicion: '5',
            // currentConsumption: 100,
            averageConsumption: 50
            // maximumConsumption: 140
          },
          {
            index: 1,
            nombreMedicion: 'Televisor',
            dispoId: 'meditionBlue',
            data: [],
            duration: 60,
            idMedicion: '6',
            // currentConsumption: 100,
            averageConsumption: 180
            // maximumConsumption: 140
          }
        ]
      }];
    return mock;
  }
};
