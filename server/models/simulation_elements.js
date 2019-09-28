module.exports = (sequelize, DataTypes) => {
  // Attributes
  const SimulationElements = sequelize.define('SimulationElements',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      useInHoursMedition: DataTypes.FLOAT,
      name: DataTypes.STRING,
      totalConsumption: DataTypes.FLOAT,
      totalCostConsumption: DataTypes.FLOAT,
      percentage: DataTypes.FLOAT
    }, {}
  );


  SimulationElements.associate = (models) => {
    models.SimulationElements.belongsTo(models.Simulation, { as: 'Simulation' });
  };

  return SimulationElements;
};
