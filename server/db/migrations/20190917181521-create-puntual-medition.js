module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PuntualMeditions', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    MeditionId: {
      type: Sequelize.INTEGER,
      model: 'Meditions', // <<< Note, its table's name, not object name
      key: 'id' // <<< Note, its a column name
    },
    value: Sequelize.FLOAT,
    offset: Sequelize.INTEGER
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('PuntualMeditions')
};
