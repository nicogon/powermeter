const moment = require('moment');

const Devise = require('../../repositories/devicesRepository').devises;

const addDevise = newDevise => Devise
  .findOne({ where: { email: newDevise.email } })
  .then((devise) => {
    if (!devise) {
      return Devise.create(newDevise);
    }
    return devise.update(newDevise);
  });

const devises = [
  addDevise({
    id: 1,
    lastInvalidation: moment()
  })
];

Promise.all(devises).then(() => process.exit(0));
