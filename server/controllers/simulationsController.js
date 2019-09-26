module.exports = function simulationsController(reportsService, simulationsService) {
  return {
    simulations,
    createNewSimulation,
    newSimulation,
    simulationDetails
  };

  async function simulations(req, res) {
    const simulations = (await simulationsService.list());

    res.render('simulations', { simulations });
  }

  async function createNewSimulation(req, res) {
    const reports = (await reportsService.listForSimulations());
    res.render('newSimulation', { reports });
  }

  async function newSimulation(req, res) {
    const name = req.body.name;
    const duration = parseInt(req.body.duration);
    const kwCost = parseInt(req.body.kwCost);

    console.log(duration)
    console.log(req.body)


    let durationInHours;
    switch (duration) {
      case 1: durationInHours = 24;
      case 2: durationInHours = 24 * 7;
      case 3: durationInHours = 24 * 14;
      case 4: durationInHours = 24 * 21;
      case 5: durationInHours = 24 * 28;
      case 6: durationInHours = 24 * 30;
        break;
    }
    const simulation = {
      reports: []
    };

    const consumeInHoursOfMeditions = [];


    for (const [key, value] of Object.entries(req.body)) {
      if (key.startsWith('slider-')) {
        const id = key.slice(7);

        const useInHours = {
          id,
          hours: value
        };
        consumeInHoursOfMeditions.push(useInHours);
      }
    }

    // console.log(consumeInHoursOfMeditions)

    simulation.name = name;
    simulation.durationInHours = durationInHours;
    simulation.hoursUseMeditions = consumeInHoursOfMeditions;
    simulation.kwhCost = kwCost;
    if (typeof req.body.reportId === 'string') {
      simulation.reports.push(req.body.reportId);
    } else {
      req.body.reportId.forEach((reportId, index) => {
        simulation.reports.push(reportId);
      });
    }

    simulationId = await simulationsService.create(simulation);
    res.redirect(`/simulaciones/${simulationId}/`);
  }

  async function simulationDetails(req, res) {
    const simulationId = req.params.simulationId;
    const simulation = await simulationsService.getSimulation(simulationId);

    res.render('simulation', { simulation });
  }
};
