'use strict';
module.exports = (sequelize, DataTypes) => {
  const LendingHistory = sequelize.define('LendingHistory', {
    duration: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  LendingHistory.associate = (models) => {
    LendingHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    LendingHistory.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
  };
  return LendingHistory;
};
