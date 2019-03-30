'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('UserTable', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  });

  UserTable.associate = function (db) {
    // Add userId to the UserInventory table
    // this.hasMany(db.UserInventory);
  };

  return UserTable;
};