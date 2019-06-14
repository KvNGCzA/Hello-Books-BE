/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Books', [{
    tag: 'Action',
    title: 'Take me home',
    description: 'Kill the all of them',
    isbn: '039494994',
    price: 6000,
    yearPublished: 2015,
    stock: 100,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tag: 'Romance',
    title: 'In my eyes',
    description: 'The heart weeps for you',
    isbn: '039494994',
    price: 2000,
    yearPublished: 2013,
    stock: 50,
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    tag: 'Comedy',
    title: 'Run',
    description: 'Run to the end of the world',
    isbn: '039494994',
    price: 10000,
    yearPublished: 2013,
    stock: 50,
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Books', null, {})
};
