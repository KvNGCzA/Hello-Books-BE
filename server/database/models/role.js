export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Role.associate = () => {
    // associations can be defined here
  };
  return Role;
};
