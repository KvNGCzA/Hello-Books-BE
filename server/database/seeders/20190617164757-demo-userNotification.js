module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserNotifications', [{
    notificationId: 1,
    userId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    notificationId: 2,
    userId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    notificationId: 3,
    userId: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserNotifications', null, {})
};
