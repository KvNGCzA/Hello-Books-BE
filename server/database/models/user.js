export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
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

    User.hasMany(models.Favourite, {
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
  };
  return User;
};
