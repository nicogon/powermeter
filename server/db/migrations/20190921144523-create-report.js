module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    timeStart: Sequelize.DATE,
    secondsDuration: Sequelize.INT,
    averageMedition: Sequelize.FLOAT,
    maximumMedition: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Reports')
};
