/* eslint-disable */
// import faker from 'faker';
// import lodash from 'lodash';
const faker = require('faker');
const lodash = require('lodash');

module.exports = {
  up: (queryInterface) => {
    const tags = ['Romance', 'Action', 'Science', 'Epic'];
    const seedData = lodash.times(14, () => ({
      title: faker.name.title(),
      description: faker.lorem.sentence(),
      isbn: faker.random.number({
        min: 1000000000000,
        max: 5000000000000
      }),
      tag: tags[faker.random.number({
        min: 0,
        max: 3
      })],
      price: faker.random.number({
        min: 1000,
        max: 5000
      }),
      yearPublished: faker.random.number({
        min: 1900,
        max: 2020
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    return queryInterface.bulkInsert('Books', seedData, {});
  },
  down: queryInterface => queryInterface.bulkDelete('Books', null, {})
};
