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
      name: {
        type: DataTypes.STRING
      },
      currentMedition: DataTypes.FLOAT,
      lastPush: DataTypes.BIGINT,
      sensibility: DataTypes.FLOAT
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
