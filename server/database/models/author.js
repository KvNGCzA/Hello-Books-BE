/* eslint-disable */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    id: DataTypes.INTEGER,
    fullname: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
    // associations can be defined here
    Author.hasMany(models.Books, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Author;
};
