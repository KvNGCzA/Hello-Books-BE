export default (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    id: DataTypes.INTEGER,
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
