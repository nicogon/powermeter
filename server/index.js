require('dotenv').config();
const express = require('express');
const container = require('./container');

async function main() {
  (await container.createContainer()).resolve(
    function contenedor(routes) {
      const app = express();
      const port = process.env.PORT || 8081;
      app.set('view engine', 'ejs');
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use('*', (req, res, next) => { console.log(req.baseUrl); next(); });
      app.use(routes);
      app.use(express.static('static'));
      app.listen(port, () => { console.log(`Listening on port ${port}`); });
    }
  );
}

main();
