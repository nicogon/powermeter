/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Reports', [
      {
        id: 1,
        name: 'Cocina',
        timeStart: '2019/09/21 14:50',
        secondsDuration: 60 * 60,
        averageMedition: 2,
        maximumMedition: 3
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Reports');
  }
};