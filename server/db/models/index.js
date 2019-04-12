const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../../config/config")[env];
const db = {};

"use strict";

// For MySQL connection,
// DB_PASSWORD=<your password>
// must be in your ".env" file.

require("dotenv").config();

let sequelize = null;

// IF in development environment and the database does NOT exist
// THEN make sure to create the database before proceeding
if (env === "development") {
	sequelize = new Sequelize("", config.username, process.env.DB_PASSWORD, {
		dialect: "mysql",
		logging: false
	});
	sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
}

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password = process.env.DB_PASSWORD,
		config
	);
}

// Load models into sequialize
fs.readdirSync(__dirname)
	.filter(function (file) {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach(function (file) {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

//
// Serialize the models
//
const syncOptions = (process.env.NODE_ENV === "test") ? {
	force: false
} : {
	force: false
};
sequelize.sync(syncOptions)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
