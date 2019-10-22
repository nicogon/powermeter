module.exports = function simulationsRepository(
  Simulation,
  SimulationElements
) {
  return { saveSimulation, index, show, destroy };

  async function saveSimulation(simulation) {
    return Simulation.create(simulation, {
      include: [
        {
          model: SimulationElements,
          as: 'simulationItems'
        }
      ]
    }).catch(console.log);
  }
  /*
   [ { MeditionId: '1', // Late
       useInHoursMedition: '10', // Late
       name: 'Heladera', // Nola
       totalConsumption: 20, // Nola
       totalCostConsumption: 2000, // Nola
       percentage: 100 } ] // Nola
*/
  async function index() {
    return Simulation.findAll({ raw: false,
      include: [{
        model: SimulationElements,
        as: 'simulationItems'
      }]

    }).catch(console.log);
  }

  async function show(simulationId) {
    return Simulation.findByPk(simulationId, {
      raw: false,
      include: [{
        model: SimulationElements,
        as: 'simulationItems'
      }]
    }).catch(console.log);
  }

  async function destroy(simulationId) {
    return Simulation.destroy(
      { where: { id: simulationId } }
    );
  }
};
