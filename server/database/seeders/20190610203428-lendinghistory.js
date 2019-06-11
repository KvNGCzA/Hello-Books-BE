/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LendingHistories', [{
  duration: 4,
  status: 'borrowed',
  bookId: 1,
  userId: 76785,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  duration: 8,
  status: 'returned',
  bookId: 2,
  userId: 78761,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  duration: 3,
  status: 'borrowed',
  bookId: 3,
  userId: 2098,
  createdAt: new Date('2019-06-01T21:24:00'),
  updatedAt: new Date()
}], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('LendingHistories', null, {})
};
