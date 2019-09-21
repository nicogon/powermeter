/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Reports', [
      {
        id: 1,
        name: 'Cocina',
        timeStart: '2019/09/21 14:50',
        duration: 'hora',
        averageMedition: 20,
        maximumMedition: 24
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Reports');
  }
};
