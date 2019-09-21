module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Meditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorId: {
        type: Sequelize.INTEGER,
        model: 'Sensors', // <<< Note, its table's name, not object name
        key: 'id' // <<< Note, its a column name
      },
      reportId: {
        type: Sequelize.INTEGER,
        model: 'Sensors', // <<< Note, its table's name, not object name
        key: 'id' // <<< Note, its a column name
      },
      name: Sequelize.STRING,
      averageMedition: Sequelize.FLOAT,
      maximumMedition: Sequelize.FLOAT,
      consumption: Sequelize.FLOAT,
      lastPush: Sequelize.BIGINT
    });
  },
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Meditions')
};
