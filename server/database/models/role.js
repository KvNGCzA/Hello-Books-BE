/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        roleName: DataTypes.STRING,
        description: DataTypes.STRING
    }, {});
    Role.associate = function(models) {
        // associations can be defined here
    };
    return Role;
};
