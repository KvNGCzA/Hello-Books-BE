/* eslint-disable */
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Jamie',
      lastName: 'Foxx',
      email: 'jamiefoxx@gmail.com',
      password: bcrypt.hashSync('jamiefoxx', 10),
      avatarUrl: '',
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'Eden',
      lastName: 'Hazard',
      email: 'eden@gmail.com',
      password: bcrypt.hashSync('edenHazard', 10),
      avatarUrl: '',
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
