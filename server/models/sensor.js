/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Sensor = sequelize.define('Sensor',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
      },
      medition: DataTypes.FLOAT,
      name: DataTypes.STRING,
      lastPush: DataTypes.BIGINT,
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
