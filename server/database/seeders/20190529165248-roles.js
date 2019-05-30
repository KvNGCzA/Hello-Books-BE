/* eslint-disable */
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
        roleName: 'admin',
        description: 'Administrator of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        roleName: 'patron',
        description: 'A full supporter of the library',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {}),

    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};