/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Sensor = sequelize.define('Sensor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      deviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
      },
      name: DataTypes.STRING,
      lastPush: DataTypes.STRING,
      sensibility: DataTypes.FLOAT
    },
    { timestamps: false }
  );

  // Associations
  Sensor.associate = (models) => {
    models.Sensor.belongsTo(models.Device, {
      as: 'device',
      foreignKey: 'id'
    });
  };

  return Sensor;
};
