module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MeditionSimulations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    MeditionId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Meditions', key: 'id' }
    },
    SimulationId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Simulations', key: 'id' }
    },
    useInHoursMedition: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('MeditionSimulations')
};
