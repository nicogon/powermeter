/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('PuntualMeditions', [
      { id: 1, value: 1, offset: 0, meditionId: 1 },
      { id: 2, value: 2, offset: 1, meditionId: 1 },
      { id: 3, value: 3, offset: 2, meditionId: 1 },
      { id: 4, value: 3, offset: 3, meditionId: 1 },
      { id: 5, value: 2, offset: 4, meditionId: 1 },
      { id: 6, value: 1, offset: 5, meditionId: 1 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('PuntualMeditions');
  }
};
