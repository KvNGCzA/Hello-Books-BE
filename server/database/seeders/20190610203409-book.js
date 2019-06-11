/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Books', [{
    title: 'things fall apart',
    description: 'Things about the fall apart',
    isbn: 94060656,
    price: 3099,
    yearPublished: 2018,
    stock: 15,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
  {
    title: 'World apart',
    description: 'Things about the fall world',
    isbn: 876540656,
    price: 3999,
    yearPublished: 2019,
    stock: 10,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()

  },
{
  title: 'In the of love',
  description: 'The way my heart feels',
  isbn: 876540656,
  price: 7999,
  yearPublished: 2017,
  stock: 9,
  authorId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Books', null, {})
};
