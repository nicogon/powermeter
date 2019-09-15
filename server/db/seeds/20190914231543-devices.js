

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('devices', [
      {
        id: 1,
        name: 'Pinza 1',
        duration: 'hora',
        time_start: Date.now(),
        time_end: Date.now() + 1 * 60 * 60 * 1000,
        average_medition: 1,
        maximum_medition: 2
      }],
    {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('devices', [{ name: 'Pinza 1' }]);
  }
};
