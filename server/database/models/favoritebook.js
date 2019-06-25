/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const FavouriteBook = sequelize.define('FavouriteBook', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  FavouriteBook.associate = (models) => {
    FavouriteBook.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    FavouriteBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });
  };
  return FavouriteBook;
};
