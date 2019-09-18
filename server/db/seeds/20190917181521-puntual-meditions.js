/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('PuntualMeditions', [
      { id: 1, value: 1, offset: 0, device_id: 1 },
      { id: 2, value: 2, offset: 1, device_id: 1 },
      { id: 3, value: 3, offset: 2, device_id: 1 },
      { id: 4, value: 3, offset: 3, device_id: 1 },
      { id: 5, value: 2, offset: 4, device_id: 1 },
      { id: 6, value: 1, offset: 5, device_id: 1 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('PuntualMeditions');
  }
};
