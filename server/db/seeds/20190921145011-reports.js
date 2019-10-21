/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Reports', [
      {
        name: 'Casa Nicolas',
        timeStart: 1571107996830,
        secondsDuration: 86400000,
        averagePower: 695.35,
        maximumPower: 3253.9
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Reports');
  }
};
