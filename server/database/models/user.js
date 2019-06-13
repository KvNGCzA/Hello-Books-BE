export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Follower, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Follower, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.FavouriteAuthor, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.UserRole, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Fine, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.LendingHistory, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.FavoriteBook, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
