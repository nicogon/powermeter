/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Sensor = sequelize.define('Report',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: `Sensor ${this.id}`
      },
      sensibility: DataTypes.FLOAT,
      timeStart: DataTypes.FLOAT,
      duration: {
        type: DataTypes.ENUM,
        values: ['hora', 'dia', 'semana', 'mes']
      },
      averageMedition: DataTypes.FLOAT,
      maximumMedition: DataTypes.FLOAT
    }, {}
  );

  // Associations
  Sensor.associate = (models) => {
    models.Sensor.belongsTo(models.Medition, {
      as: 'medition',
      foreignKey: 'id'
    });
  };

  return Sensor;
};
