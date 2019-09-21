module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sensors', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    timeStart: Sequelize.DATE,
    duration: Sequelize.ENUM,
    averageMedition: Sequelize.FLOAT,
    maximumMedition: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Sensors')
};
