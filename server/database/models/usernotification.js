/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const UserNotification = sequelize.define('UserNotification', {
    userId: DataTypes.INTEGER,
    notificationId: DataTypes.INTEGER
  }, {});
  UserNotification.associate = function (models) {
    UserNotification.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    UserNotification.belongsTo(models.Notification, {
      foreignKey: 'notificationId',
      onDelete: 'CASCADE'
    });
  };
  return UserNotification;
};
