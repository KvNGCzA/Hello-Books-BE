/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Books', [{
    title: 'Mystries in Biology',
    description: 'Publication manual of the American Biological Association',
    isbn: 9783161484100,
    price: 400,
    yearPublished: 2005,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    title: 'Science and its flaws',
    description: 'Publication manual of the American Theological Association',
    isbn: 9781402894626,
    price: 4000,
    yearPublished: 1999,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Books', null, {})
};
