const express = require('express');

const apiV1PublicRouter = require('./routes');

const app = express();

const port = 8080;

app.set('view engine', 'ejs');

app.use(
  '*',
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  },
);

app.use(apiV1PublicRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
