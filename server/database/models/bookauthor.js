module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('BookAuthor', {
    authorId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  BookAuthor.associate = (models) => {
    BookAuthor.belongsTo(models.Author, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });

    BookAuthor.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });
  };
  return BookAuthor;
};
