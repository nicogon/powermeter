module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sensors', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    medition: Sequelize.FLOAT,
    name: Sequelize.STRING,
    lastPush: Sequelize.BIGINT,
    sensibility: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Sensors')
};
