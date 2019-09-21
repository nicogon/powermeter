module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
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
      name: {
        type: Sequelize.STRING
      },
      averageMedition: {
        type: Sequelize.FLOAT
      },
      maximumMedition: {
        type: Sequelize.FLOAT
      }
    });
  },

  /*

  ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }*/
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Devices')
};
