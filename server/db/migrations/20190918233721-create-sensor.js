module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sensors', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    sensibility: Sequelize.FLOAT,
    currentMedition: Sequelize.FLOAT,
    lastPush: Sequelize.BIGINT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Sensors')
};
