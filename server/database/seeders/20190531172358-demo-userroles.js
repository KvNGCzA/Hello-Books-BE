/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    userId: 2,
    roleId: process.env.ADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 10,
    roleId: process.env.ADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 4,
    roleId: process.env.SUPERADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 5,
    roleId: process.env.PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 3,
    roleId: process.env.PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 9,
    roleId: process.env.PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
