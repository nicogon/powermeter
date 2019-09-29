module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Simulations', [
      {
        name: 'Cocina de Nico',
        totalCost: 1000,
        totalKwh: 100,
        fixedCost: 800,
        kwhCost: 750,
        durationInHours: 24
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Simulations');
  }
};
