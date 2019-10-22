const _ = require('lodash');

module.exports = function simulationsController(reportsService, simulationsService) {
  return {
    simulations,
    createNewSimulation,
    newSimulation,
    simulationDetails,
    deleteSimulation
  };

  async function simulations(_req, res) {
    const simulationList = (await simulationsService.list());

    res.render('simulations', { simulationList });
  }

  async function createNewSimulation(_req, res) {
    let reports = (await reportsService.listForSimulations());
    reports = reports.map(report => ({
      ...report,
      date: calculateDate(report)
    }));

    const simulations = (await simulationsService.list());
    const lastSimulation = _.last(simulations);
    let lastKwhCost = 0;
    let lastFixedCost = 0;

    if (!(typeof lastSimulation === 'undefined')) {
      lastKwhCost = lastSimulation.kwhCost;
      lastFixedCost = lastSimulation.fixedCost;
    }
    res.render('newSimulation', { reports, lastKwhCost, lastFixedCost });
  }

  async function newSimulation(req, res) {
    const name = req.body.name;
    const kwhCost = parseFloat(req.body.kwhCost);
    const durationInHours = 24 * [1, 7, 15, 30][parseInt(req.body.duration) - 1];
    const sliders = sliderList(req.body);
    const fixedCost = parseFloat(req.body.fixedCost);
    const simulation = { name, kwhCost, durationInHours, simulationItems: sliders, fixedCost };

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

  async function deleteSimulation(req, res) {
    const simulationId = req.params.simulationId;
    await simulationsService.destroySimulation(simulationId);
    res.status(200).send();
  }

  function calculateDate(report) {
    const f = new Date(report.timeStart - 0);
    return f.toLocaleString('es-ES',{timeZone: "America/Argentina/Buenos_Aires"});
  }
};
