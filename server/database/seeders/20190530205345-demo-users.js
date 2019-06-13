/* eslint-disable */
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
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
      firstName: 'UseIna',
      lastName: 'inactivate',
      email: 'inactiveuser@email.com',
      password: bcrypt.hashSync('password', 10),
      avatarUrl: '',
      verified: true,
      status: 'inactive',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      firstName: 'John',
      lastName: 'Simons',
      email: 'johnsimons@gmail.com.ng',
      password: bcrypt.hashSync('g4g5j6lkl4k9', 10),
      avatarUrl: 'https://banner2.kisspng.com/20180408/tvw/kisspng-user-computer-icons-gravatar-blog-happy-woman-5aca6d03e6c3f5.6041125615232156199452.jpg',
      verified: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
