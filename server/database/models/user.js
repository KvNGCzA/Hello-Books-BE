export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    paymentStatus: DataTypes.BOOLEAN
  }, {});

  User.associate = (models) => {
    User.hasMany(models.FavouriteAuthor, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.UserRole, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.LendingHistory, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.FavouriteBook, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
