/* eslint-disable */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourites = sequelize.define('Favourites', {
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  Favourites.associate = function(models) {
    // associations can be defined here
    Favourites.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Favourites.belongsTo(models.Author, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Favourites;
};
