/* eslint-disable prefer-promise-reject-errors */

const Umzug = require('umzug');

const sequelize = require('../models').sequelize;

console.log('\nRunning migrations...');

exports.check = async () => {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor,
        () => {
          throw new Error('Migration tried to use old style "done" callback.upgrade');
        }
      ],
      path: './db/migrations',
      pattern: /\.js$/
    }
  });

  const migrations = await umzug.pending();
  if (migrations.length) {
    return umzug.up().catch((err) => {
      console.error(err);
      return Promise.reject('There are pending migrations that could not be executed');
    });
  }
};
