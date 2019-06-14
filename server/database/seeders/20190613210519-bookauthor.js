/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('BookAuthors', [{
    authorId:1,
    bookId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    authorId: 1,
    bookId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    authorId: 2,
    bookId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('BookAuthors', null, {})
};
