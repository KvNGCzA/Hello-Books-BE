/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    id: 1,
    userId: 2,
    roleId: 2113,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 2,
    userId: 3,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
