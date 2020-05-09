/* eslint-disable object-curly-newline */

module.exports = {
  up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert(
      'Reports',
      [
        {
          name: 'Casa Nicolas - Reporte diario',
          timeStart: 1571107996830,
          secondsDuration: 86400000,
          averagePower: 695.35,
          maximumPower: 3253.9
        },
        {
          name: 'Heladera Nicolas - 40 minutos',
          timeStart: 1771107996830,
          secondsDuration: 1000 * 60 * 40, // 40 minutos - 60 segundos - 1000 ms
          averagePower: 74.52,
          maximumPower: 812.1
        }
      ],
      {}
    );
  },

  down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete('Reports');
  }
};
