export default (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});

  Follower.associate = (models) => {
    Follower.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Follower.belongsTo(models.User, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE'
    });
  };
  return Follower;
};
