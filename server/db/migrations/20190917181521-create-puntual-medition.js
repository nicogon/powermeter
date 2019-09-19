module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PuntualMeditions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: 'Devices', key: 'id' }
      },
      value: Sequelize.FLOAT,
      offset: Sequelize.INTEGER
    });
  },

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('PuntualMeditions')
};
