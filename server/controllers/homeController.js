const homeService = require('../services/homeService');

async function mainHome(req, res) {
  res.render('home', { titulo: await homeService.ponele() });
}

module.exports = { mainHome };
