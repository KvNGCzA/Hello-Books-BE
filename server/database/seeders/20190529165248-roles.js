/* eslint-disable */
module.exports = {
    up: queryInterface => queryInterface.bulkInsert('Roles', [{
        id: 2113,
        roleName: 'admin',
        description: 'Administrator of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        id: 2768,
        roleName: 'patron',
        description: 'A full supporter of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        id: 1002,
        roleName: 'superadmin',
        description: 'Super administrator of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {}),
    down: queryInterface => queryInterface.bulkDelete('Roles', null, {})
};
