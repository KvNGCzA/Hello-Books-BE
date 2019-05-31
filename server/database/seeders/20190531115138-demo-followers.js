/* eslint-disable */
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Followers', [{
    id: 1,
    userId: 2,
    followerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Followers', null, {})
};
