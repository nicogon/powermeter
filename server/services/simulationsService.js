const _ = require('lodash');

module.exports = function simulationsService(reportsService, simulationRepository) {
  return {
    list,
    create,
    getSimulation
  };
  async function list() {
    mock = [
      {
        simulationId: '123',
        name: 'Casa Hector',
        duration: 900000,
        fixedCost: 1000,
        kwCost: 40,
        totalCost: 14000
      },
      {
        simulationId: '1234',
        name: 'Casa Nico',
        duration: 1800000,
        fixedCost: 500,
        kwCost: 30,
        totalCost: 12000
      },
      {
        simulationId: '1235',
        name: 'Casa Lucas',
        duration: 450000,
        fixedCost: 200,
        kwCost: 20,
        totalCost: 10000
      }];
    return mock;
  }

  async function create(simulation) {
    simulation.averageConsumptions = [];

    for (reportId of simulation.reports) {
      const report = (await reportsService.list()).find(report => report.reportId == reportId);

      for (medicion of report.mediciones) {
        const simulationItem = {
          name: medicion.nombreMedicion,
          totalConsumption: medicion.averageConsumption * simulation.duration,
          totalCostConsumption: medicion.averageConsumption * simulation.duration * simulation.kwCost // La idea es que el costo se ponga en el formulario de la simulacio
        };

        simulation.averageConsumptions.push(simulationItem);
      }
    }
    simulation.totalKw = _.sum(simulation.averageConsumptions.map(item => item.totalCostConsumption));
    simulation.totalCost = simulation.totalKw * simulation.kwCost;

    for (item of simulation.averageConsumptions) {
      const total = parseInt(simulation.totalKw);
      // TODO: Ver de aproximar bien estos porcentajes, para arriba o abajo
      item.percentage = parseInt(100 * item.totalCostConsumption / total, 10);
    }


    simulation.id = '1234';

    // TODO: Al save le tengo que pasar como duración dia, semana, quincena, mes.
    const simulationId = '1234';
    // console.log(simulation)
    // const simulationId = simulationRepository.save(simulacion);
    return simulationId;
  }


  async function getSimulation(simulationId) {
    return {
      reports: ['12345', '123'],
      name: 'Ivan',
      duration: 720,
      kwCost: 30,
      averageConsumptions: [
        {
          name: 'Lampara',
          totalConsumption: 36000,
          totalCostConsumption: 1080000,
          percentage: 12
        },
        {
          name: 'Televisor',
          totalConsumption: 129600,
          totalCostConsumption: 3888000,
          percentage: 43
        },
        {
          name: 'Microondas',
          totalConsumption: 57600,
          totalCostConsumption: 1728000,
          percentage: 19
        },
        {
          name: 'Heladera',
          totalConsumption: 72000,
          totalCostConsumption: 2160000,
          percentage: 24
        }
      ],
      totalKw: 8856000,
      totalCost: 265680000,
      id: '1234'
    };
    // TODO: EN un futuro se usara la de abajo.
    // return simulationRepository.getSimulation(simulationId)// reportsRepository.getReport(reportId);
  }
};
