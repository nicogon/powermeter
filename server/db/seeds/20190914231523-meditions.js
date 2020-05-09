const { heladeraCuarenta } = require('./puntual_meditions/reports/2/heladeraCuarenta');

const { heladeraDiaria } = require('./puntual_meditions/reports/1/heladeraDiaria');
const { lucesDiaria } = require('./puntual_meditions/reports/1/lucesDiaria');
const { estufaDiaria } = require('./puntual_meditions/reports/1/estufaDiaria');
const { hornitoDiaria } = require('./puntual_meditions/reports/1/hornitoDiaria');
const { enchufesDiaria } = require('./puntual_meditions/reports/1/enchufesDiaria');
const { caloventorDiaria } = require('./puntual_meditions/reports/1/caloventorDiaria');

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(
      'Meditions',
      [
        {
          ReportId: 1,
          name: 'Heladera',
          averagePower: 74.52,
          maximumPower: 812.1,
          puntualMeditions: heladeraDiaria
        },
        {
          ReportId: 1,
          name: 'Luces',
          averagePower: 26.99,
          maximumPower: 255.9,
          puntualMeditions: lucesDiaria
        },
        {
          ReportId: 1,
          name: 'Estufa',
          averagePower: 501.93,
          maximumPower: 964.6,
          puntualMeditions: estufaDiaria
        },
        {
          ReportId: 1,
          name: 'Hornito',
          averagePower: 10.73,
          maximumPower: 1493.7,
          puntualMeditions: hornitoDiaria
        },
        {
          ReportId: 1,
          name: 'Caloventor',
          averagePower: 11.99,
          maximumPower: 1149.2,
          puntualMeditions: caloventorDiaria
        },
        {
          ReportId: 1,
          name: 'Enchufes',
          averagePower: 69.19,
          maximumPower: 214.7,
          puntualMeditions: enchufesDiaria
        },
        {
          ReportId: 2,
          name: 'Heladera 40 mins',
          averagePower: 74.52,
          maximumPower: 812.1,
          puntualMeditions: heladeraCuarenta
        }
      ],
      {}
    );
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Meditions', {});
  }
};
