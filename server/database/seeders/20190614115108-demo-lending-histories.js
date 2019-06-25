/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LendingHistories', [{
    userId: 3,
    bookId: 1,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYwNzQxNTMyfQ.rLSG383b3t9ywzpYP1di-9hAePJxJglF2Nz0O-4L9oU',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    userId: 3,
    bookId: 2,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYwNzQxNTMyfQ.rLSG383b3t9ywzpYP1di-9hAePJxJglF2Nz0O-4L9oU',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

   down: (queryInterface, Sequelize) => queryInterface.bulkDelete('LendingHistories', null, {})
};