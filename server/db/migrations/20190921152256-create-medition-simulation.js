module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MeditionSimulation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    meditionId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Meditions', key: 'id' }
    },
    simulationId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Simulations', key: 'id' }
    }
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('MeditionSimulation')
};
