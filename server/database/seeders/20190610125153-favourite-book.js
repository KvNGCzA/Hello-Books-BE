/* eslint-disable */

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('FavouriteBooks', [{
    bookId: 1,
    userId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    bookId: 2,
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('FavouriteBooks', null, {})

};
