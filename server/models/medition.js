/* eslint-disable function-paren-newline */
const pry = require('pryjs');

module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Medition = sequelize.define('Medition',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      averageMedition: DataTypes.FLOAT,
      maximumMedition: DataTypes.FLOAT
    },
    { timestamp: true }
  );

  // Associations 

  // q hago con esto?
  Medition.associate = (models) => {
    models.Medition.hasMany(models.PuntualMedition, {
      onDelete: 'CASCADE',
      as: 'devices',
      foreignKey: 'id'
    });
  };

  // Instance methods
  Medition.prototype.maxConsumption = () => 2; // this.puntualMeditions.max
  Medition.prototype.avgConsumption = () => 2; // this.puntualMeditions.avg
 // Device.prototype.consumption = () => 2; // this.puntualMeditions.last.value
//Device.prototype.lastPush = () => Date.now; // this.puntualMeditions.last.created_at
 // Device.prototype.isOnline = () => true; // lastPush in (Date.now-5.segs..Date.now)

  return Medition;
};
