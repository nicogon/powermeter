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

  Report.SIMILAR_VALUES_ON_REPORTS = 0.05;

  // Associations
  Report.associate = (models) => {
    // creo que no va
    models.Report.hasMany(models.Medition, {
      as: 'meditions'
    });
  };

  return Report;
};
