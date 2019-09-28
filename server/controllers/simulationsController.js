module.exports = function simulationsController(reportsService, simulationsService) {
  return {
    simulations,
    createNewSimulation,
    newSimulation,
    simulationDetails,
    deleteConfirmation,
    destroy
  };

  async function simulations(_req, res) {
    const simulationList = (await simulationsService.list());

    res.render('simulations', { simulationList });
  }

  async function createNewSimulation(_req, res) {
    const reports = (await reportsService.listForSimulations());
    res.render('newSimulation', { reports });
  }

  async function newSimulation(req, res) {
    const name = req.body.name;
    const kwhCost = parseInt(req.body.kwhCost);
    const durationInHours = 24 * [1, 7, 14, 21, 28, 30][parseInt(req.body.duration) - 1];
    const sliders = sliderList(req.body);
    const simulation = { name, kwhCost, durationInHours, simulationItems: sliders };

    // ESTO POR AHORA NO LO USAMOS, DEJEMOSLO POR LAS DUDAS, DE ULTIMA LO BORRAMOS.
    // if (typeof req.body.reportId === 'string') {
    //   simulation.reports.push(req.body.reportId);
    // } else {
    //   req.body.reportId.forEach((reportId, index) => {
    //     simulation.reports.push(reportId);
    //   });
    // }

    simulationId = await simulationsService.create(simulation);

    res.redirect(`/simulaciones/${simulationId}/`);

    function sliderList(requestBody) {
      return Object.entries(requestBody)
        .filter(([key, _value]) => key.startsWith('slider-'))
        // eslint-disable-next-line no-unused-expressions
        .map(([key, value]) => ({ MeditionId: key.slice(7), useInHoursMedition: value }));
    }
  }

  async function simulationDetails(req, res) {
    const simulationId = req.params.simulationId;
    const simulation = await simulationsService.getSimulation(simulationId);
    
    res.render('simulation', { simulation });
  }

  async function deleteConfirmation(req, res) {
    const simulationId = req.params.simulationId;
    const simulation = await simulationsService.getSimulation(simulationId);

    res.render('delete_simulation_confirmation', { simulation });
  }

  async function destroy(req, res) {
    const simulationId = req.params.simulationId;
    const simulation = await simulationsService.getSimulation(simulationId);

    await simulationsService.destroySimulation(simulationId);
    res.render('deleted_simulation', { simulation });
  }
};
