module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Meditions', [
      {
        sensorId: 1,
        reportId: 1,
        name: 'Heladera',
        averagePower: 2,
        maximumPower: 3
      }],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Meditions', {});
  }
};
