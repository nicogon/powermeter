module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('MeditionSimulations', [
      { MeditionId: 1, SimulationId: 1, useInHoursMedition: 4 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('MeditionSimulations');
  }
};
