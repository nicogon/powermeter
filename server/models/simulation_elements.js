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
      useInHoursMedition: DataTypes.FLOAT
    }, {}
  );


  SimulationElements.associate = (models) => {
    models.SimulationElements.belongsTo(models.Simulation, { as: 'simulation' });
  };

  return SimulationElements;
};
