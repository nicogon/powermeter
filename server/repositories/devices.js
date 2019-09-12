module.exports = (sequelize, DataTypes) => {
  const device = sequelize.define('devices', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    }
  });
  return device;
};
