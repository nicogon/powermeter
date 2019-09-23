module.exports = function simulationsController(reportsService, homeService, simulationsService) {
  return {
    home
  };

  async function home(req, res) {
    
    const allReports = (await reportsService.list());
    const simulations = (await simulationsService.list());

    const reports = allReports.slice(Math.max(allReports.length - 4, 1))
    res.render('home', { reports, simulations });
  }
};
