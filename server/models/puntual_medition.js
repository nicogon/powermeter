module.exports = (sequelize, DataTypes) => {
  // Attributes
  const PuntualMedition = sequelize.define('PuntualMedition',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER

      },
      value: DataTypes.FLOAT,
      offset: DataTypes.INTEGER
    }, {}
  );

  // Associations
  PuntualMedition.associate = (models) => {
    models.PuntualMedition.belongsTo(models.Medition, {
      as: 'medition',
      foreignKey: 'id'
    });
  };

  return PuntualMedition;
};
