/* eslint-disable function-paren-newline */

module.exports = (sequelize, DataTypes) => {
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
    {
      timestamps: false,
      classMethods: {
        associate(models) { PuntualMedition.belongsTo(models.devices, { as: 'device' }); }
      }
    }
  );
  return PuntualMedition;
};
