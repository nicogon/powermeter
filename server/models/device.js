/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => sequelize.define('devices',
  { // <Attributes>
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.ENUM('dia', 'hora', 'semana')
    },
    time_start: {
      type: DataTypes.DATE
    },
    time_end: {
      type: DataTypes.DATE
    },
    average_medition: {
      type: DataTypes.FLOAT
    },
    maximum_medition: {
      type: DataTypes.FLOAT
    }
  }, // </Attributes>

  {} // Aca van los classMethods y Hooks
);
