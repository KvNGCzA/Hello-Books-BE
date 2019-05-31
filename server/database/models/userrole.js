export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {});
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE'
    });
  };
  return UserRole;
};
