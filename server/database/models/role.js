export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Role.associate = (models) => {
    Role.hasMany(models.UserRole, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE'
    });
  };
  return Role;
};
