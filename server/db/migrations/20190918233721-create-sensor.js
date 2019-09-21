module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sensors', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    sensibility: Sequelize.FLOAT
  }),

  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Sensors')
};
