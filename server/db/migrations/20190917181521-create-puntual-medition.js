module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PuntualMeditions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    meditionId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: { model: 'Meditions', key: 'id' }
    },
    value: Sequelize.FLOAT,
    offset: Sequelize.INTEGER
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('PuntualMeditions')
};
