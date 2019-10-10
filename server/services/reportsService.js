/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */

const _ = require('lodash');

module.exports = function reportsService(
  Report,
  reportsRepository,
  tempReport,
  lock
) {
  return {
    nuevo,
    notify,
    getReport,
    list,
    listForSimulations,
    getMedition,
    del,
    eraseTemp,
    isTemp,
    lastReport
  };

  function eraseTemp() {
    tempReport = null;
  }

  function isTemp() {
    return !!tempReport;
  }
  async function del(dispoId) {
    return reportsRepository.del(dispoId);
  }

  async function getReport(reportId) {
    if (reportId === 'temp') return { now: Date.now(), ...tempReport }; // reportsRepository.getReport(reportId);
    const report = await reportsRepository.getReport(reportId);
    return populateCurrent(report);

  }

  async function notify(sensorId, meditionValue) {
    await lock.acquire();

    if (process.env.SHOW_CONSOLE_LOGS === true) console.log(tempReport);

    // Buscar si existe una medicion asociada a un sensor
    const activeMedition = tempReport
      && tempReport.meditions.find(medition => medition.dispoId === sensorId);

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
    await reportsRepository
      .saveReport(tempReport)
      .catch(() => (tempReport = null));
    tempReport = null;
  }

  function updateActiveAndMaxMeditions(activeMedition, medicion) {
    modifyMedition(activeMedition, medicion);
    updateTemporalReport();
    // console.log(tempReport)
  }

  function fixed(num, e = 2) {
    return +`${Math.round(`${num}e+${e}`)}e-${e}`;
  }

  function calculateMeditions(medition, currentPower, averagePower = null) {
    medition.maximumPower = fixed(
      Math.max(medition.maximumPower, currentPower),
      1
    );
    medition.currentPower = fixed(currentPower, 1);
    medition.meditionCounter++;
    medition.averagePower = averagePower || fixed(
      (medition.averagePower * (medition.meditionCounter - 1) + currentPower)
        / medition.meditionCounter,
      1
    );
    return medition;
  }

  function updateTemporalReport() {
    const currentPower = _.sum(
      tempReport.meditions.map(medicionInt => medicionInt.currentPower)
    );
    const averagePower = _.sum(
      tempReport.meditions.map(medicionInt => medicionInt.averagePower)
    );
    tempReport = calculateMeditions(tempReport, currentPower, averagePower);
    tempReport = populateCurrent(tempReport);
    return tempReport;
  }

  function significantChange(currentValue, previousMeditionValue) {
    const correctionFactor = Report.SIMILAR_VALUES_ON_REPORTS;
    const minValue = (1 - correctionFactor) * currentValue;
    const maxValue = (1 + correctionFactor) * currentValue;

    return previousMeditionValue > maxValue || previousMeditionValue < minValue;
  }

  function modifyMedition(medicionAMofidicar, value) {
    medicionAMofidicar = calculateMeditions(medicionAMofidicar, value);
    const previousMedition = medicionAMofidicar.puntualMeditions.pop();

    const changed = previousMedition
      ? significantChange(value, previousMedition.value)
      : true;

    if (previousMedition) {
      if (previousMedition.blocked) {
        medicionAMofidicar.puntualMeditions.push(previousMedition);
      } else if (changed) {
        medicionAMofidicar.puntualMeditions.push(previousMedition);
      }
    }

    medicionAMofidicar.puntualMeditions.push({
      offset: parseInt(Date.now() - tempReport.realTimeStart, _),
      value,
      blocked: changed
    });

    return medicionAMofidicar;
  }

  function populateCurrent(medition) {
    medition.currentCurrent = fixed(medition.currentPower / 220);
    medition.averageCurrent = fixed(medition.averagePower / 220);
    medition.maximumCurrent = fixed(medition.maximumPower / 220);
    if (medition.meditions) {
      medition.meditions = medition.meditions.map(populateCurrent);
    }
    return medition;
  }

  async function nuevo({ name, secondsDuration, meditions, timeStart }) {
    tempReport = {
      name,
      secondsDuration,
      meditions: meditions.map(initializateMeditions),
      timeStart,
      realTimeStart: Date.now(),
      timeEnd: Date.now() + secondsDuration
    };

    tempReport = initializateMeditions(tempReport);
    return 'temp';
  }

  function initializateMeditions(medition) {
    return {
      ...medition,
      currentPower: 0,
      maximumPower: 0,
      averagePower: 0,
      meditionCounter: 0
    };
  }

  async function list() {
    return reportsRepository.list();
  }

  async function listForSimulations() {
    return reportsRepository.listForSimulations();
  }

  async function getMedition(meditionId) {
    return reportsRepository.getMedition(meditionId);
  }

  async function lastReport() {
    return reportsRepository.last();
  }
};
