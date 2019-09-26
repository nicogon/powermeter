module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Simulations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    totalCost: Sequelize.FLOAT,
    fixedCost: Sequelize.FLOAT,
    kwhCost: Sequelize.FLOAT,
    durationInHours: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Simulations')
};
