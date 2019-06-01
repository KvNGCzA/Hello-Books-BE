/* eslint-disable */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
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
    }], {}),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
