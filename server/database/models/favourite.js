export default (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  Favourite.associate = (models) => {
    Favourite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Favourite.belongsTo(models.Author, {
      foreignKey: 'authorId',
      onDelete: 'CASCADE'
    });
  };
  return Favourite;
};
