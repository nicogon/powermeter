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
      puntualMeditions: DataTypes.JSONB,
      name: DataTypes.STRING,
      averagePower: DataTypes.FLOAT,
      maximumPower: DataTypes.FLOAT
    }, {}
  );

  // Associations

  // Instance methods
  Medition.prototype.isOnline = () => true; // lastPush in (Date.now-5.segs..Date.now)

  return Medition;
};
