'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInventory = sequelize.define('UserInventory', {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    brandStyle: DataTypes.STRING,
    size: DataTypes.INTEGER,
    percentBottleRemaining: DataTypes.INTEGER,
    currentBottleValue: DataTypes.INTEGER,
    fullBottleCount: DataTypes.INTEGER,
    totalCost: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {});
  UserInventory.associate = function(models) {
    // associations can be defined here
  };
  return UserInventory;
};