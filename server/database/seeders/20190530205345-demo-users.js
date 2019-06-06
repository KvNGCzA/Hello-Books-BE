/* eslint-disable */
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 3768,
      firstName: 'Jamie',
      lastName: 'Foxx',
      email: 'jamiefoxx@gmail.com',
      password: bcrypt.hashSync('jamiefoxx', 10),
      avatarUrl: '',
      verified: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 76785,
      firstName: 'Eden',
      lastName: 'Hazard',
      email: 'eden@gmail.com',
      password: bcrypt.hashSync('edenHazard', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 78761,
      firstName: 'Kylian',
      lastName: 'Mbappe',
      email: 'kylian@gmail.com',
      password: bcrypt.hashSync('kylianMbappe', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2098,
      firstName: 'Hello',
      lastName: 'Books',
      email: 'hellobooks@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 8998,
      firstName: 'Rich',
      lastName: 'Richard',
      email: 'notsuperadmin@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 8908,
      firstName: 'User',
      lastName: 'Deactivate',
      email: 'deactivateuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 1008,
      firstName: 'User',
      lastName: 'Activate',
      email: 'Activateuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 1118,
      firstName: 'UseIna',
      lastName: 'inactivate',
      email: 'inactiveuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
