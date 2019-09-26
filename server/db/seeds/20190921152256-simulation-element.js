module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('SimulationElements', [
      { SimulationId: 1, useInHoursMedition: 4 }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('SimulationElements');
  }
};
