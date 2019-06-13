
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
    bookId: 1,
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('BookAuthors', null, {})
};
