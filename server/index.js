require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const migrationsManager = require('./migrations');
const routes = require('./routes');
const errors = require('./middlewares/errors');

const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10;
const DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const main = () => {
  const app = express();
  const port = process.env.PORT || 3000;
  module.exports = app;

  // Client must send "Content-Type: application/json" header
  app.use(bodyParser.json(bodyParserJsonConfig()));
  app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));

  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('*', (req, _res, next) => { console.log(req.baseUrl); next(); });
  app.use(routes);
  app.use(express.static('static'));
  app.listen(port, () => { console.log(`Listening on port ${port}`); });

  Promise.resolve()
    .then(() => {
      if (!config.isTesting) {
        return migrationsManager.check();
      }
    })
    .then(() => {
      routes.init(app);
      app.use(errors.handle);
      app.listen(port);
      console.log(`Listening on port: ${port}`);
    })
    .catch(console.error);
};

main();
