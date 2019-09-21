module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('Meditions', [
      {
        id: 1,
        name: 'Casa',
        averageMedition: 1,
        maximumMedition: 2
      }],
    {});
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Meditions', {});
  }
};
