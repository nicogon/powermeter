/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

const _ = require('lodash');

module.exports = function reportsService(
  sensorsRepository,
  reportsRepository,
  sessionId,
  tempReport,
  lock
) {
  return {
    nuevo,
    notify,
    getReport,
    list,
    listForSimulations
  };

  async function getReport(reportId) {
    if (reportId == 'temp') return { now: Date.now(), ...tempReport };// reportsRepository.getReport(reportId);
    const report = await reportsRepository.getReport(reportId);
    //    console.log(JSON.stringify(report))
    return report;
  }

  async function notify(sensorId, meditionValue) {
    await lock.acquire();

    if (process.env.SHOW_CONSOLE_LOGS === true) console.log(tempReport);

    // Buscar si existe una medicion asociada a un sensor
    const activeMedition = tempReport && tempReport.meditions.find(medition => medition.dispoId === sensorId);

    // Si la medicion finalizo, borrar el objeto temporal de la memoria
    if (hasFinish()) {
      console.log('TERMINO');
      await saveReport(tempReport);
    }

    if (tempReport && activeMedition) {
      updateActiveAndMaxMeditions(activeMedition, meditionValue);
    }

    await lock.release();
  }

  function hasFinish() {
    return tempReport && tempReport.timeEnd < Date.now();
  }

  async function saveReport() {
    // console.log(tempReport)
    const storedReport = await reportsRepository.saveReport(tempReport).catch(() => tempReport = null);
    tempReport = null;
  }

  function updateActiveAndMaxMeditions(activeMedition, medicion) {
    modifyMedition(activeMedition, medicion);
    updateTemporalReport();
    // console.log(tempReport)
  }

  function fixed(num, e = 2) {
    return +(`${Math.round(`${num}e+${e}`)}e-${e}`);
  }

  function calculateMeditions(medition, currentPower) {
    medition.maximumPower = fixed(Math.max(medition.maximumPower, currentPower), 1);
    medition.currentPower = fixed(currentPower, 1);
    medition.meditionCounter++;
    medition.averagePower = fixed((medition.averagePower * (medition.meditionCounter - 1) + currentPower) / medition.meditionCounter, 1);
    return medition;
  }


  function updateTemporalReport() {
    const currentPower = _.sum(tempReport.meditions.map(medicionInt => (medicionInt.currentPower)));
    tempReport = calculateMeditions(tempReport, currentPower);
    tempReport = populateCurrent(tempReport);
    return tempReport;
  }

  function modifyMedition(medicionAMofidicar, value) {
    medicionAMofidicar = calculateMeditions(medicionAMofidicar, value);
    medicionAMofidicar.puntualMeditions.push({ offset: parseInt(Date.now() - tempReport.timeStart, _), value });
    return medicionAMofidicar;
  }

  function randomId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);
  }

  function populateCurrent(medition) {
    medition.currentCurrent = fixed(medition.currentPower / 220);
    medition.averageCurrent = fixed(medition.averagePower / 220);
    medition.maximumCurrent = fixed(medition.maximumPower / 220);
    if (medition.meditions) medition.meditions = medition.meditions.map(populateCurrent);
    return medition;
  }

  async function nuevo({
    name, secondsDuration, meditions
  }) {
    tempReport = {
      name,
      secondsDuration,
      meditions: meditions.map(initializateMeditions),
      timeStart: Date.now(),
      timeEnd: Date.now() + secondsDuration
    };

    tempReport = initializateMeditions(tempReport);
    return 'temp';
  }

  function initializateMeditions(medition) {
    return {
      ...medition, currentPower: 0, maximumPower: 0, averagePower: 0, meditionCounter: 0
    };
  }


  async function list() {
    return reportsRepository.list();
  }

  async function listForSimulations() {
    return reportsRepository.listForSimulations();
  }

  async function list2() {
    mock = [
      {
        reportId: '123',
        nombre: 'Cocina',
        duracion: 90,
        inicio: 1565223068401,
        fin: 1595223968401,
        sessionId: '4oy0xej',
        currentPower: 100,
        averagePower: 80, // Es necesario? Quizas..
        maximumPower: 140,
        mediciones: [
          {
            index: 0,
            nombreMedicion: 'Microondas',
            dispoId: 'meditionRed',
            data: [],
            idMedicion: '1',
            // currentPower: 100,
            duration: 60,
            averagePower: 80
            // maximumPower: 140
          },
          {
            index: 1,
            nombreMedicion: 'Heladera',
            dispoId: 'meditionBlue',
            data: [],
            idMedicion: '2',
            // currentPower: 100,
            duration: 60,
            averagePower: 100
            // maximumPower: 140
          }]
      },
      {
        reportId: '1234',
        nombre: 'Comedor',
        duracion: 180,
        inicio: 1565223068401,
        fin: 1595223968401,
        sessionId: '4oy0xek',
        currentPower: 80,
        averagePower: 40,
        maximumPower: 120,
        mediciones: [
          {
            index: 0,
            nombreMedicion: 'Televisor',
            dispoId: 'meditionRed',
            data: [],
            // currentPower: 100,
            duration: 60,
            idMedicion: '3',
            averagePower: 80
            // maximumPower: 140
          },
          {
            index: 1,
            nombreMedicion: 'Aire acondicionado',
            dispoId: 'meditionBlue',
            data: [],
            // currentPower: 100,
            idMedicion: '4',
            averagePower: 30,
            duration: 60
            // maximumPower: 140
          }
        ]
      },
      {
        reportId: '12345',
        nombre: 'Pieza',
        duracion: 360,
        inicio: 1565223068401,
        fin: 1595223968401,
        sessionId: '4oy0xel',
        currentPower: 120,
        averagePower: 100,
        maximumPower: 180,
        mediciones: [
          {
            index: 0,
            nombreMedicion: 'Lampara',
            dispoId: 'meditionRed',
            data: [],
            duration: 60,
            idMedicion: '5',
            // currentPower: 100,
            averagePower: 50
            // maximumPower: 140
          },
          {
            index: 1,
            nombreMedicion: 'Televisor',
            dispoId: 'meditionBlue',
            data: [],
            duration: 60,
            idMedicion: '6',
            // currentPower: 100,
            averagePower: 180
            // maximumPower: 140
          }
        ]
      }];
    return mock;
  }
};
