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
      maximumMedition: DataTypes.FLOAT,
      consumption: DataTypes.FLOAT,
      lastPush: DataTypes.FLOAT
    }, {}
  );

  // Associations
  Medition.associate = (models) => {
    models.Medition.hasMany(models.PuntualMedition, {
      onDelete: 'CASCADE',
      as: 'puntualMeditions',
      foreignKey: 'id'
    });

    models.Medition.belongsTo(models.Sensor, {
      as: 'sensor',
      foreignKey: 'id'
    });

    models.Medition.belongsTo(models.Report, {
      as: 'report',
      foreignKey: 'id'
    });
  };

  // Instance methods
  Medition.prototype.isOnline = () => true; // lastPush in (Date.now-5.segs..Date.now)

  return Medition;
};
