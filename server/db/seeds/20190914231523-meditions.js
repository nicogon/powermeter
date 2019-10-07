const stub = require('../../test/stub/refrigerator-40-mins');

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Meditions', [
      {
        ReportId: 1,
        name: 'Heladera',
        averagePower: 61,
        maximumPower: 1790.1,
        puntualMeditions: stub.refrigerator40Mins
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Meditions', {});
  }
};
