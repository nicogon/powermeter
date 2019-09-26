module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Simulation = sequelize.define(
    'Simulation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      totalCost: DataTypes.FLOAT,
      fixedCost: DataTypes.FLOAT,
      kwhCost: DataTypes.FLOAT,
      durationInHours: DataTypes.FLOAT
    },
    {}
  );

  // Associations
  Simulation.associate = (models) => {
    models.Simulation.hasMany(models.SimulationElements, {
      as: 'simulationItems'
    });
  };

  return Simulation;
};
