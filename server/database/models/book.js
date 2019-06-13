export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isbn: DataTypes.BIGINT,
    price: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER
  }, {});

  Book.associate = (models) => {
    Book.hasMany(models.BookAuthor, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });

    Book.hasMany(models.Fine, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });

    Book.hasMany(models.LendingHistory, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });

    Book.hasMany(models.FavoriteBook, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });
  };
  return Book;
};
