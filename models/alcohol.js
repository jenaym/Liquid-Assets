'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alcohol = sequelize.define('Alcohol', {
    type: DataTypes.STRING,
    brandStyle: DataTypes.STRING,
    bottleSize: DataTypes.INTEGER,
    gramsPerBottle: DataTypes.INTEGER,
    emptyBottleWeight: DataTypes.INTEGER,
    gramsPerOunce: DataTypes.INTEGER
  }, {});
  Alcohol.associate = function(models) {
    // associations can be defined here
  };
  return Alcohol;
};