const config = require('./index').common.database;

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres',
    logging: console.log,
    define: {
      timestamps: false  // I don't want timestamp fields by default
    }
  }
};
