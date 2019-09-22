module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    timeStart: Sequelize.BIGINT,
    secondsDuration: Sequelize.INTEGER,
    averagePower: Sequelize.FLOAT,
    maximumPower: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Reports')
};
