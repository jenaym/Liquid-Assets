'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserInventory = sequelize.define('UserInventory', {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    brandStyle: DataTypes.STRING,
    costPerBottle: DataTypes.DECIMAL(10,2),
    sizeML: DataTypes.DECIMAL(10,2),
    sizeOZ: DataTypes.DECIMAL(10,2),
    ozRemaining: DataTypes.DECIMAL(10,2),
    percentBottleRemaining: DataTypes.DECIMAL(10,2),
    costPerOZ: DataTypes.DECIMAL(10,2),
    currentValueOfBottle: DataTypes.DECIMAL(10,2),
    totalBottles: DataTypes.DECIMAL(10,2),
    totalInventoryValue: DataTypes.DECIMAL(10,2),
    // http://docs.sequelizejs.com/manual/models-definition.html#timestamps
    // createdAt: DataTypes.DATE // should come from migration or default
  }, {});
  UserInventory.associate = function(models) {
    // associations can be defined here
  };
  return UserInventory;
};