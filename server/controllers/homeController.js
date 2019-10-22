module.exports = function simulationsController(reportsService, homeService, simulationsService) {
  return {
    home
  };

  async function home(req, res) {
    const allReports = (await reportsService.list());
    const allSimulations = (await simulationsService.list());

    const reports = allReports.slice(Math.max(allReports.length - 4, 0));
    const simulations = allSimulations.slice(Math.max(allSimulations.length - 10, 0));

    res.render('home', { reports, simulations });
  }
};
