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
      sizeML: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      sizeOZ: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      emptyBottleWeight: {
        type: Sequelize.INTEGER
      },
      gramsPerOunce: {
        type: Sequelize.DECIMAL(10,2),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alcohol');
  }
};