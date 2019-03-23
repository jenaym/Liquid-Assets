'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserInventory', {
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
      sizeML: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      sizeOZ: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      percentBottleRemaining: {
        type: Sequelize.DECIMAL(10,2),
      },
      currentValueOfBottle: {
        type: Sequelize.DECIMAL(10,2),
      },
      totalFullBottles: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('UserInventory');
  }
};