'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alcohol', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brandStyle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bottleSize: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gramsPerBottle: {
        type: Sequelize.INTEGER
      },
      emptyBottleWeight: {
        type: Sequelize.INTEGER
      },
      gramsPerOunce: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
        
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alcohol');
  }
};