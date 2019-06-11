export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    authorName: DataTypes.STRING
  }, {});
  Author.associate = (models) => {
    Author.hasMany(models.BookAuthor, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });

    Author.hasMany(models.FavouriteAuthor, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Author;
};
