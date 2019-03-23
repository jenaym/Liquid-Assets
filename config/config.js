require("dotenv").config();

module.exports = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "inventory_db",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "inventory_db",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
};