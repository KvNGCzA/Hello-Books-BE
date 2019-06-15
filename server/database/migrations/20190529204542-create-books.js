/* eslint-disable */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isbn: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      yearPublished: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tag: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};
