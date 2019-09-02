// const homeService = require('../services/homeService');

// async function home(req, res) {
//   res.render('home', { });
// }

// module.exports = { home };



module.exports = function simulationsController(reportesService,homeService) {
  return {
    home
  };

  async function home(req, res) {
      const reports = (await reportesService.list());
  
      res.render('home', { reports });
    }
};

