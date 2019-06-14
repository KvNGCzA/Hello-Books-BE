/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    userId: 2,
    roleId: 2113,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 10,
    roleId: 2113,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 4,
    roleId: 1002,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 5,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 3,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 9,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 11,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
