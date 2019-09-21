module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Devices', [
      {
        id: 1,
        name: 'Heladera',
        averageMedition: 1,
        maximumMedition: 2,
        sensorId:1
      }],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Devices', {});
  }
};
