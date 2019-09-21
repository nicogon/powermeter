module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Report = sequelize.define('Report',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
      },
      name: DataTypes.STRING,
      timeStart: DataTypes.FLOAT,
      secondsDuration: DataTypes.INTEGER,
      averageMedition: DataTypes.FLOAT,
      maximumMedition: DataTypes.FLOAT
    }, {}
  );

  // Associations
  Report.associate = (models) => {
  /* 
  creo que no va
    models.Report.belongsTo(models.Medition, {
      as: 'medition',
      foreignKey: 'id'
    });

    */
  };

  return Report;
};
