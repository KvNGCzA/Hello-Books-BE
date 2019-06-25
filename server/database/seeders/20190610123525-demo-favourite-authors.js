/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FavouriteAuthors', [{
      userId: 3,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 8,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 9,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FavouriteAuthors', null, {});
  }
};
