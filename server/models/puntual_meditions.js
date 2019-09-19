/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => {
  // Attributes
  const PuntualMedition = sequelize.define('PuntualMedition',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
        autoIncrement: true
      },
      value: DataTypes.FLOAT,
      offset: DataTypes.INTEGER
    },
    { timestamps: false }
  );

  // Associations
  PuntualMedition.associate = (models) => {
    models.PuntualMedition.hasMany(models.Device, {
      onDelete: 'CASCADE',
      as: 'device',
      foreignKey: 'id'
    });
  };

  return PuntualMedition;
};
