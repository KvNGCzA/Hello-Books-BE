export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    tag: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    isbn: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    yearPublished: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
  }, {});
  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'authorId',
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
  };
  return Book;
};
