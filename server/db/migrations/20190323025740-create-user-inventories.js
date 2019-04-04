'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserInventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      brandStyle: {
        type: Sequelize.STRING
      },
      costPerBottle: {
        type: Sequelize.DECIMAL(10,2),
      },
      sizeML: {
        type: Sequelize.DECIMAL(10,2),
      },
      sizeOZ: {
        type: Sequelize.DECIMAL(10,2),
      },
      ozRemaining: {
        type: Sequelize.DECIMAL(10,2),
      },
      percentBottleRemaining: {
        type: Sequelize.DECIMAL(10,2),
      },
      costPerOZ: {
        type: Sequelize.DECIMAL(10,2),
      },
      currentValueOfBottle: {
        type: Sequelize.DECIMAL(10,2),
      },
      totalBottles: {
        type: Sequelize.DECIMAL(10,2),
      },
      totalInventoryValue: {
        type: Sequelize.DECIMAL(10,2),
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
    return queryInterface.dropTable('UserInventories');
  }
};
