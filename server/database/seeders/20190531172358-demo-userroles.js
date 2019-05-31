/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    id: 1,
    userId: 2,
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
