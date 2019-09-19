/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Sensors', [
      { id: 1, deviceId: 1, name: 'Pinza 1', sensibility: 30 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Sensors');
  }
};
