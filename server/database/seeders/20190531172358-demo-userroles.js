/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    id: 9890,
    userId: 76785,
    roleId: 2113,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 4564,
    userId: 2098,
    roleId: 1002,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 4444,
    userId: 8998,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 4488,
    userId: 78761,
    roleId: 2768,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
