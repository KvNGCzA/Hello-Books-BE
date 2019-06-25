/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BookAuthors', [{
      bookId: 3,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      bookId: 2,
      authorId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      bookId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      bookId: 2,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BookAuthors', null, {});
  }
};
