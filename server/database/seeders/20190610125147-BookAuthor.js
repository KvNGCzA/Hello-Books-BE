
/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('BookAuthors', [{
    bookId: 1,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 2,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 4,
    authorId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 3,
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 5,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('BookAuthors', null, {})
};
