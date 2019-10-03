module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Simulations', [
      {
        name: 'Casa de Ivan',
        totalCost: 2664,
        totalKwh: 703,
        fixedCost: 1555,
        kwhCost: 3.7950,
        durationInHours: 720
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Simulations');
  }
};
