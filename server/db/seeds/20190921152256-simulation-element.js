module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('SimulationElements', [
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Cocina',
        totalConsumption: 234,
        totalCostConsumption: 888,
        percentage: 33
      },
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Comedor',
        totalConsumption: 234,
        totalCostConsumption: 888,
        percentage: 33
      },
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Pieza',
        totalConsumption: 234,
        totalCostConsumption: 888,
        percentage: 33
      }],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('SimulationElements');
  }
};
