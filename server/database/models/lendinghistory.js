export default (sequelize, DataTypes) => {
  const LendingHistory = sequelize.define('LendingHistory', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    charge: DataTypes.INTEGER
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
