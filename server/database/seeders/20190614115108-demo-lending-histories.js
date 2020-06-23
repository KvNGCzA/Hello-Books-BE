/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('LendingHistories', [{
    userId: 11,
    bookId: 1,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYxNDU3MTkzLCJleHAiOjE1NjE2Mjk5OTN9.cJKDXMaOghXvDx7X1VrtXj8diJ6RX6MKN2zwzBmPpY',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    userId: 3,
    bookId: 2,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYxMDE4NjgzLCJleHAiOjE1NjE0NTA2ODN9.SM_BhMFx8K_4c7FtEe4PZv9hZto7GWv884PxEv9Jb_8',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    userId: 9,
    bookId: 2,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYxMDE4ODIzLCJleHAiOjE1NjExOTE2MjN9.LEci4UPmNatdJjneo6bmFg67vw0TyRhHZOjoE3gg78I',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    userId: 1,
    bookId: 2,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTYxMDE4ODIzLCJleHAiOjE1NjExOTE2MjN9.LEci4UPmNatdJjneo6bmFg67vw0TyRhHZOjoE3gg78I',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    userId: 9,
    bookId: 1,
    charge: 200,
    durationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTYxNDU3MTkzLCJleHAiOjE1NjE2Mjk5OTN9.cJKwDXMaOghXvDx7X1VrtXj8diJ6RX6MKN2zwzBmPpY',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

   down: (queryInterface, Sequelize) => queryInterface.bulkDelete('LendingHistories', null, {})
};