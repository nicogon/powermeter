module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Meditions', [
      {
        id: 1,
        sensorId: 1,
        reportId: 1,
        name: 'Heladera',
        averageMedition: 2,
        maximumMedition: 3,
        consumption: 1,
        lastPush: 20190921143023
      }],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Meditions', {});
  }
};
