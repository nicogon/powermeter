module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Simulations', [
      {
        name: 'Casa Nicolas',
        totalCost: 1191.46,
        totalKwh: 287.6058,
        fixedCost: 100,
        kwhCost: 3.795,
        durationInHours: 720
      }
    ], {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Simulations');
  }
};
