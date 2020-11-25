const config = require('./index').common.database;

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres',
    omitNull: true,
    logging: false,
    define: {
      timestamps: false // I don't want timestamp fields by default
    }
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres',
    omitNull: true,
    logging: false,
    define: {
      timestamps: false // I don't want timestamp fields by default
    }
  }
};
