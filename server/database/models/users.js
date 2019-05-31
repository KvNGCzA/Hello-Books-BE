/* eslint-disable */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {});

  Users.associate = (models) => {
    Users.hasMany(models.Followers, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Users.hasMany(models.Followers, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE'
    });

    Users.hasMany(models.Favourites, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};
