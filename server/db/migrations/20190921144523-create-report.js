module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    sensibility: Sequelize.FLOAT,
    timeStart: Sequelize.DATE,
    secondsDuration: Sequelize.INTEGER,
    averageMedition: Sequelize.FLOAT,
    maximumMedition: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Reports')
};
