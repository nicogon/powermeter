module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Devices', [
      {
        id: 1,
        name: 'Heladera',
        duration: 'hora',
        time_start: '2019/09/14 21:15',
        time_end: '2019/09/14 22:15',
        average_medition: 1,
        maximum_medition: 2,
        createdAt: '2019/09/14 21:15',
        updatedAt: '2019/09/14 21:15'
      },
      {
        id: 2,
        name: 'Microondas',
        duration: 'hora',
        time_start: '2019/09/14 21:15',
        time_end: '2019/09/14 22:15',
        average_medition: 100,
        maximum_medition: 170,
        createdAt: '2019/09/19 21:15',
        updatedAt: '2019/09/19 21:15'
      },
      {
        id: 3,
        name: 'Pava Electrica',
        duration: 'hora',
        time_start: '2019/09/19 21:15',
        time_end: '2019/09/19 22:15',
        average_medition: 1,
        maximum_medition: 2,
        createdAt: '2019/09/19 22:15',
        updatedAt: '2019/09/19 22:15'
      }],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Devices', [{ name: 'Pinza 1' }]);
  }
};
