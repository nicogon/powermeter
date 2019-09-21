module.exports = (sequelize, DataTypes) => {
  // Attributes
  const Simulation = sequelize.define('Simulation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
      },
      name: DataTypes.STRING,
      totalCost: DataTypes.FLOAT,
      fixedCost: DataTypes.FLOAT,
      kwhCost: DataTypes.FLOAT,
      duration: {
        type: DataTypes.ENUM,
        values: ['hora', 'dia', 'semana', 'mes']
      }
    }, {}
  );

  // Associations
  Simulation.associate = (models) => {
    models.Simulation.hasMany(models.MeditionSimulation, {
      as: 'meditionSimulation',
      foreignKey: 'id'
    });
  };

  return Simulation;
};
