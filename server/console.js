const repl = require('repl');
const fs = require('fs');
const models = require('./models');
const pjson = require('./package.json');

const convertFunctionToAsync = f => async (...args) => {
  const result = await f(...args);
  console.log(JSON.stringify(result, null, 2));
  return result;
};

const convertObjectFunctionsToAsync = (serviceMethods) => {
  const asyncServiceMethods = {};
  Object.keys(serviceMethods).forEach((key) => {
    if (typeof serviceMethods[key] === 'function') {
      asyncServiceMethods[key] = convertFunctionToAsync(serviceMethods[key]);
    } else asyncServiceMethods[key] = serviceMethods[key];
  });
  return asyncServiceMethods;
};

Promise.resolve().then(() => {
  const replServer = repl.start({ prompt: `${pjson.name}> ` });

  replServer.context.models = models;

  const servicesPath = './services/';

  fs.readdir(servicesPath, (_err, files) => {
    files.forEach((file) => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const serviceMethods = require(`${servicesPath}${file}`);
      const asyncServiceMethods = convertObjectFunctionsToAsync(serviceMethods);
      replServer.context[`${file.split('.')[0]}Service`] = asyncServiceMethods;
    });
  });
});
