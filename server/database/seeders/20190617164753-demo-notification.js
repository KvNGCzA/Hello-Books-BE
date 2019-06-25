module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Notifications', [{
    message: 'new message 1',
    type: 'new book',
    isRead: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    message: 'new message 2',
    type: 'new book',
    isRead: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    message: 'new message 3',
    type: 'new book',
    isRead: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
