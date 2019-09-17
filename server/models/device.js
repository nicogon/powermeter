/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => sequelize.define('Device',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: DataTypes.STRING,
    duration: DataTypes.ENUM('dia', 'hora', 'semana'),
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE,
    average_medition: DataTypes.FLOAT,
    maximum_medition: DataTypes.FLOAT
  }, {}
);
