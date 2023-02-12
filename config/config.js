require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },

  test: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },

  production: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
