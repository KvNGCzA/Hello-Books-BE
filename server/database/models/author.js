export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    fullname: DataTypes.STRING
  }, {});
  Author.associate = (models) => {
    Author.hasMany(models.Book, {
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
