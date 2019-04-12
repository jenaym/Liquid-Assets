'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alcohol = sequelize.define('Alcohol', {
    type: DataTypes.STRING,
    brandStyle: DataTypes.STRING,
    sizeML: DataTypes.DECIMAL(10,0),
    sizeOZ: DataTypes.DECIMAL(10,2),
    emptyBottleWeight: DataTypes.INTEGER,
    gramsPerOunce: DataTypes.DECIMAL(10, 2),
    image: DataTypes.STRING,
    tastingNotes: DataTypes.STRING(1234)
  }, {});
  Alcohol.associate = function (models) {
    // associations can be defined here
  };
  return Alcohol;
};