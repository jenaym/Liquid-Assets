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
      },
<<<<<<< HEAD
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tastingNotes: {
        type: Sequelize.STRING(1234),
        allowNull: true
=======
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
>>>>>>> cdbf4bda95056dbace571373c420a9799c483175
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alcohol');
  }
};