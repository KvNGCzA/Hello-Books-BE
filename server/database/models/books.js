/* eslint-disable */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isbn: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
    Books.belongsTo(models.Author, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Books;
};
