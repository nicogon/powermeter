

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Devices', [
      {
        id: 1,
        name: 'Pinza 1',
        duration: 'hora',
        time_start: '2019/09/14 21:15',
        time_end: '2019/09/14 22:15',
        average_medition: 1,
        maximum_medition: 2,
        createdAt: '2019/09/14 21:15',
        updatedAt: '2019/09/14 21:15'
      }],
    {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Devices', [{ name: 'Pinza 1' }]);
  }
};
