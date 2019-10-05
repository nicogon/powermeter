  module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Meditions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ReportId: {
      type: Sequelize.INTEGER,
      model: 'Reports', // <<< Note, its table's name, not object name
      key: 'id' // <<< Note, its a column name
    },
    name: Sequelize.STRING,
    puntualMeditions: Sequelize.JSONB,
    averagePower: Sequelize.FLOAT,
    maximumPower: Sequelize.FLOAT
  }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Meditions')
};
