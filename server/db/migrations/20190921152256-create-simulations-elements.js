module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SimulationElements', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    SimulationId: {
      type: Sequelize.INTEGER,
      references: { model: 'Simulations', key: 'id' },
      onDelete: 'CASCADE'
    },
    useInHoursMedition: Sequelize.FLOAT,
    name: Sequelize.STRING,
    totalConsumption: Sequelize.FLOAT,
    totalCostConsumption: Sequelize.FLOAT,
    percentage: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('SimulationElements')
};
