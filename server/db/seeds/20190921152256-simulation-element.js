module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('SimulationElements', [
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Heladera',
        totalConsumption: 51.4188,
        totalCostConsumption: 195.134346,
        percentage: 17.8782208147402
      },
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Luces',
        totalConsumption: 19.4328,
        totalCostConsumption: 73.747476,
        percentage: 6.75674829923458
      },
      { SimulationId: 1,
        useInHoursMedition: 10,
        name: 'Estufa',
        totalConsumption: 150.579,
        totalCostConsumption: 571.447305,
        percentage: 52.3560373260901
      },
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Hornito',
        totalConsumption: 7.7256,
        totalCostConsumption: 29.318652,
        percentage: 2.6861767043641
      },
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Caloventor',
        totalConsumption: 8.6328,
        totalCostConsumption: 32.761476,
        percentage: 3.00160845156808
      },
      { SimulationId: 1,
        useInHoursMedition: 24,
        name: 'Enchufes',
        totalConsumption: 49.8168,
        totalCostConsumption: 189.054756,
        percentage: 17.321208404003
      }
    
    
    ],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('SimulationElements');
  }
};
