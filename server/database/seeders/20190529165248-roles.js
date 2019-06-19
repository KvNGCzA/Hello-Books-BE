/* eslint-disable */
module.exports = {
    up: queryInterface => queryInterface.bulkInsert('Roles', [{
        id: process.env.ADMIN_ROLE,
        roleName: 'admin',
        description: 'Administrator of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        id: process.env.PATRON_ROLE,
        roleName: 'patron',
        description: 'A full supporter of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        id: process.env.SUPERADMIN_ROLE,
        roleName: 'superadmin',
        description: 'Super administrator of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {}),
    down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
