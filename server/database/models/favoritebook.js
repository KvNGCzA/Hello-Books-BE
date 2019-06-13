/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const FavoriteBook = sequelize.define('FavoriteBook', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  FavoriteBook.associate = (models) => {
    FavoriteBook.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    FavoriteBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });
  };
  return FavoriteBook;
};
