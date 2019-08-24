const homeService = require('../services/homeService');

async function home(req, res) {
  res.render('home', { });
}

module.exports = { home };
