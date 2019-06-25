/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [{
      authorName: 'john doe',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      authorName: 'george r. martin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      authorName: 'martin smart',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      authorName: 'alex ferguson',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      authorName: 'jurgen klopp',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: queryInterface => queryInterface.bulkDelete('Authors', null, {})
};
