/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    userId: 2,
    roleId: 2113,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 3,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
