module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('MeditionSimulation', [
      { id: 1, meditionId: 1, simulationId: 1 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('MeditionSimulation');
  }
};
