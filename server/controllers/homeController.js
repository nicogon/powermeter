// const homeService = require('../services/homeService');

// async function home(req, res) {
//   res.render('home', { });
// }

// module.exports = { home };



module.exports = function simulationsController(reportesService, homeService, simulationsService) {
  return {
    home
  };

  async function home(req, res) {
      const reports = (await reportesService.list());
      const simulations = (await simulationsService.list());

      res.render('home', { reports, simulations });
    }
};

