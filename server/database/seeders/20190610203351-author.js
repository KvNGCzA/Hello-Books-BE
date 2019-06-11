/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Authors', [{
    fullname: 'Greate Joy',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fullname: 'Ike Peter',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fullname: 'Samson Peter',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Authors', null, {})
};
