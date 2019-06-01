export default (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    id: DataTypes.INTEGER,
    fullname: DataTypes.STRING
  }, {});
  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });

    Author.hasMany(models.Favourite, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Author;
};
