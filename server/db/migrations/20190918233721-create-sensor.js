module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sensors', {
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
    name: Sequelize.STRING,
    sensibility: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Sensors')
};
