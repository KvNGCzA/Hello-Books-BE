/* eslint-disable */
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    Notification.hasMany(models.UserNotification, {
      foreignKey: 'notificationId',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};