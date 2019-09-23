/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('PuntualMeditions', [
      { value: 1, offset: 0, MeditionId: 1 },
      { value: 2, offset: 1, MeditionId: 1 },
      { value: 3, offset: 2, MeditionId: 1 },
      { value: 3, offset: 3, MeditionId: 1 },
      { value: 2, offset: 4, MeditionId: 1 },
      { value: 1, offset: 5, MeditionId: 1 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('PuntualMeditions');
  }
};
