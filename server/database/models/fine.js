/* eslint-disable */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fine = sequelize.define('Fine', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Fine.associate = function (models) {
    // associations can be defined here
    Fine.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Fine.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });
  };
  return Fine;
};
