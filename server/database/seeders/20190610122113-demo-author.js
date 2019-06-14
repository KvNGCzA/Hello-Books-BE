/* eslint-disable */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [{
      fullname: 'alex ferguson',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullname: 'jurgen klopp',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   {
      fullname: 'joe kapoo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};
