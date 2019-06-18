/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('BookAuthors', [{
    bookId: 1,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 2,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 3,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 4,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 5,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 6,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 7,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 8,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 9,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 10,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 11,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 12,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 13,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    bookId: 14,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('BookAuthors', null, {})
};
