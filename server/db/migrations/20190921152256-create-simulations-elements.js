module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SimulationElements', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    SimulationId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Simulations', key: 'id' }
    },
    useInHoursMedition: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('SimulationElements')
};
