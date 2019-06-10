export default (sequelize, DataTypes) => {
  const FavouriteAuthor = sequelize.define('FavouriteAuthor', {
    userId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  FavouriteAuthor.associate = (models) => {
    FavouriteAuthor.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    FavouriteAuthor.belongsTo(models.Author, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return FavouriteAuthor;
};
