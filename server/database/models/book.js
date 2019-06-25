export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isbn: DataTypes.BIGINT,
    tag: DataTypes.STRING,
    price: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER
  }, {});

  Book.associate = (models) => {
    Book.hasMany(models.BookAuthor, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });

    Book.hasMany(models.LendingHistory, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });

    Book.hasMany(models.FavouriteBook, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE'
    });
  };
  return Book;
};
