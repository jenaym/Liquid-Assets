'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('UserTable', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  UserTable.associate = function(models) {
    // associations can be defined here
  };
  return UserTable;
};