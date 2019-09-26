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
      },
      useInHoursMedition: DataTypes.FLOAT
    }, {}
  );

  // Associations
  MeditionSimulation.associate = (models) => {
    models.MeditionSimulation.belongsTo(models.Medition, { as: 'medition' });
  };

  MeditionSimulation.associate = (models) => {
    models.MeditionSimulation.belongsTo(models.Simulation, { as: 'simulation' });
  };

  return MeditionSimulation;
};
