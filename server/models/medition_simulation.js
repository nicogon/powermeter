module.exports = (sequelize, DataTypes) => {
  // Attributes
  const MeditionSimulation = sequelize.define('MeditionSimulation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      }
    }, {}
  );

  // Associations
  MeditionSimulation.associate = (models) => {
    models.MeditionSimulation.belongsTo(models.Medition, {
      as: 'medition',
      foreignKey: 'id'
    });
  };

  MeditionSimulation.associate = (models) => {
    models.MeditionSimulation.belongsTo(models.Simulation, {
      as: 'simulation',
      foreignKey: 'id'
    });
  };

  return MeditionSimulation;
};
