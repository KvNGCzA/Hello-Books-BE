/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LendingHistories', [{
    userId: 1,
    bookId: 1,
    charge: 490,
    durationToken: 'token',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    userId: 1,
    bookId: 1,
    charge: 6000,
    durationToken: 'token',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 3,
    bookId: 1,
    charge: 200,
    durationToken: 'token',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 3,
    bookId: 2,
    charge: 200,
    durationToken: 'token',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('LendingHistories', null, {})
};
