/* eslint-disable */
 const { ADMIN_ROLE, SUPERADMIN_ROLE, PATRON_ROLE } = process.env;
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('UserRoles', [{
    userId: 2,
    roleId: ADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 10,
    roleId: ADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 4,
    roleId: SUPERADMIN_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 5,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 1,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 6,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 7,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 8,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 3,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 9,
    roleId: PATRON_ROLE,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {})
};
