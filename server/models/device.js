/* eslint-disable function-paren-newline */
const pry = require('pryjs');

module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Device = sequelize.define('Device',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      duration: DataTypes.ENUM('dia', 'hora', 'semana'),
      time_start: DataTypes.DATE,
      time_end: DataTypes.DATE,
      average_medition: DataTypes.FLOAT,
      maximum_medition: DataTypes.FLOAT
    },
    { timestamp: true }
  );

  // Associations
  Device.associate = (models) => {
    models.Device.hasMany(models.PuntualMedition, {
      onDelete: 'CASCADE',
      as: 'puntualMeditions',
      foreignKey: 'id'
    });

    models.Device.hasOne(models.Sensor, {
      onDelete: 'CASCADE',
      as: 'sensor',
      foreignKey: 'id'
    });
  };

  // Instance methods
  Device.prototype.maxConsumption = () => 2; // this.puntualMeditions.max
  Device.prototype.avgConsumption = () => 2; // this.puntualMeditions.avg
  Device.prototype.consumption = () => 2; // this.puntualMeditions.last.value
  Device.prototype.lastPush = () => Date.now; // this.puntualMeditions.last.created_at
  Device.prototype.isOnline = () => true; // lastPush in (Date.now-5.segs..Date.now)

  return Device;
};
