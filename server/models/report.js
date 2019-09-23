module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Report = sequelize.define('Report',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      timeStart: DataTypes.BIGINT,
      secondsDuration: DataTypes.INTEGER,
      averagePower: DataTypes.FLOAT,
      maximumPower: DataTypes.FLOAT
    }, {}
  );

  // Associations
  Report.associate = (models) => {
    // creo que no va
    models.Report.hasMany(models.Medition, {
      as: 'meditions',
      foreignKey: 'id'
    });
  };

  return Report;
};
