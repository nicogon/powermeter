module.exports = (sequelize, DataTypes) => {
  // Attributes
  const PuntualMedition = sequelize.define('PuntualMedition',
    {
      meditionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
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
