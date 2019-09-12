const Umzug = require('umzug');
const Sequelize = require('sequelize');

const config = require('./../config');
const errors = require('./../errors');

const sequelize = require('./../repositories').sequelize;

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
      path: './migrations',
      pattern: /\.js$/
    }
  });
  const migrations = await umzug.pending();
  if (migrations.length) {
    if (config.isDevelopment) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Pending migrations, run: npm run migrations');
    }
    return umzug.up().catch((err) => {
      console.error(err);
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('There are pending migrations that could not be executed');
    });
  }
};
