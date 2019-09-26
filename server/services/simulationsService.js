/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
const _ = require('lodash');

module.exports = function simulationsService(
  reportsService,
  simulationsRepository,
  Simulation
) {
  return { list, create, getSimulation, createSimulation };

  async function list() {
    const pepe = await simulationsRepository.saveSimulation(await getSimulation());

  //  console.log(pepe);

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
      }
    ];
    return mock;
  }

  async function create(simulation) {
    simulation.simulationItems = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const medition of simulation.hoursUseMeditions) {
      // eslint-disable-next-line no-await-in-loop
      const fullMedition = await reportsService.getMedition(medition.id);

      const totalConsumption =
        fullMedition.averagePower *
        (medition.hours / 24) *
        simulation.durationInHours;

      console.log('totalConsumption');
      console.log(totalConsumption);

      const simulationItem = {
        name: fullMedition.name,
        totalConsumption,
        totalCostConsumption: totalConsumption * simulation.kwhCost
      };
      simulation.simulationItems.push(simulationItem);
    }
    simulation.totalKw = _.sum(
      simulation.simulationItems.map((item) => item.totalConsumption)
    );
    simulation.totalCost = _.sum(
      simulation.simulationItems.map((item) => item.totalCostConsumption)
    );

    for (const item of simulation.simulationItems) {
      const total = parseInt(simulation.totalKw);
      item.percentage = Math.round(
        parseInt((100 * item.totalConsumption) / total)
      );
    }

    simulation.id = '1234';

    const simulationId = '1234';
    console.log('Ahora');

    console.log(simulation);
    // const simulationId = simulationRepository.save(simulacion);
    return simulationId;
  }

  async function createSimulation({ name, kwCost, durationInHours, sliders }) {
    const simulation = await Simulation.create({
      name,
      durationInHours,
      kwhCost: kwCost
    });
    // TODO: Todavia no anda
    // await meditionSimulationsRepository.saveMeditionSimulation(simulation, sliders);

    return simulation;

    /*
      // TODO: Esto ni idea que es

      if (typeof requestBody.reportId === 'string') {
        simulation.reports.push(req.body.reportId);
      }
      else {
        req.body.reportId.forEach((reportId, index) => {
          simulation.reports.push(reportId);
        });
      }
    */
  }

  async function getSimulation(simulationId) {
    return {
      // reports: [ '2', '3' ], ver si hacer un reportItems
      name: 'Nueva simu',
      durationInHours: 720,
      kwhCost: 20,
      simulationItems: [
        {
          name: 'Luz',
          totalConsumption: 97.2,
          totalCostConsumption: 1944,
          percentage: 28
        },
        {
          name: 'Tele',
          totalConsumption: 111.6,
          totalCostConsumption: 2232,
          percentage: 32
        },
        {
          name: 'Pava eléctrica',
          totalConsumption: 44.64,
          totalCostConsumption: 892.8,
          percentage: 13
        },
        {
          name: 'Microondas',
          totalConsumption: 89.28,
          totalCostConsumption: 1785.6,
          percentage: 26
        }
      ],
      totalKw: 685.44,
      totalCost: 137.088,
      id: '1234'
    };
  }
};

// for (reportId of simulation.reports) {

//   const report = (await reportsService.listForSimulations()).find(report => report.id == reportId);
//   // console.log(simulation)
//   // console.log(report)

//   // for (medition of report.meditions) {
//   //   // const simulationItem = {
//   //   //   name: medition.name,
//   //   //   totalConsumption: medition.averagePower * simulation.duration /100, //el /100 es para q se vea lindo
//   //   //   totalCostConsumption: medition.averagePower * simulation.duration * simulation.kwCost /100//el /100 es para q se vea lindo
//   //   // };

//   //   // simulation.averagePower.push(simulationItem);
//   // }
// }
