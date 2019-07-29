const express = require('express');
const container = require('./container');

async function main() {
  (await container.createContainer()).resolve(function contenedor(
    homeService,
    routes
  ) {
    const app = express();
    const port = 8081;
    app.set('view engine', 'ejs');
    app.use(express.static('static'));
    app.use(express.json());
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
    app.use(routes);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
}

main();
