/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define('Followers', {
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});

  Followers.associate = (models) => {
    Followers.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Followers.belongsTo(models.Users, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE'
    });
  };
  return Followers;
};
