/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Authors', [{
    fullname: 'John Doe',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    fullname: 'George R. Martin',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    fullname: 'Martin Smart',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Authors', null, {})
};
