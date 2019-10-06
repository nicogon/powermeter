module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('SimulationElements', 'SimulationId', {
      type: Sequelize.INTEGER,
      primaryKey: false,
      references: { model: 'Simulations', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('SimulationElements', 'SimulationId', {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Simulations', key: 'id' }
    });
  }
};
