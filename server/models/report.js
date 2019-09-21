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
      sensibility: DataTypes.FLOAT,
      timeStart: DataTypes.FLOAT,
      duration: {
        type: DataTypes.ENUM,
        values: ['hora', 'dia', 'semana', 'mes']
      },
      averageMedition: DataTypes.FLOAT,
      maximumMedition: DataTypes.FLOAT
    }, {}
  );

  // Associations
  Report.associate = (models) => {
    models.Report.belongsTo(models.Medition, {
      as: 'medition',
      foreignKey: 'id'
    });
  };

  return Report;
};
