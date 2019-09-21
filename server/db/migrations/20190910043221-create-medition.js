module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Meditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
