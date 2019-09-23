module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Simulations', [
      {
        name: 'Cocina de Nico',
        totalCost: 1000,
        fixedCost: 800,
        kwhCost: 750,
        duration: 'dia'
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Simulations');
  }
};
