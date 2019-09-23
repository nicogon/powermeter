module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('MeditionSimulation', [
      { meditionId: 1, simulationId: 1 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('MeditionSimulation');
  }
};
