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
      deviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
      },
      value: DataTypes.FLOAT,
      offset: DataTypes.INTEGER
    },
    { timestamps: false }
  );

  // Associations
  PuntualMedition.associate = (models) => {
    models.PuntualMedition.belongsTo(models.Device, {
      as: 'device',
      foreignKey: 'id'
    });
  };

  return PuntualMedition;
};
