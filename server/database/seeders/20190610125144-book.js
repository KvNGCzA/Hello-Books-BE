/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Books', [{
    title: 'Mystries in Biology',
    description: 'Publication manual of the American Biological Association',
    isbn: 9783161484100,
    price: 400,
    yearPublished: 2005,
    tag: 'Action',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    title: 'Science and its flaws',
    description: 'Publication manual of the American Theological Association',
    isbn: 9781402894626,
    price: 4000,
    yearPublished: 1999,
    tag: 'Epic',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    title: 'A Tale of Two Cities',
    description: 'A fictional story of two cities',
    isbn: 9780936318288,
    price: 500,
    yearPublished: 1992,
    tag: 'Epic',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    title: 'A Game of Thrones',
    description: 'The story of seven kingdoms vying for the Iron Throne',
    isbn: 9786980524712,
    price: 2500,
    yearPublished: 2011,
    tag: 'Thriller',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    title: 'Breaking Bad',
    description: 'Highschool teacher and student, Walter and Jessie, run a multi-million dollar drug cartel',
    isbn: 9781798169353,
    price: 2600,
    yearPublished: 2007,
    tag: 'Action',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Books', null, {})
};
