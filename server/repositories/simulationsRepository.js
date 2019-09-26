module.exports = function simulationsRepository(
  Simulation,
  SimulationElements
) {
  return { saveSimulation };

  async function saveSimulation(simulation) {
    console.log(simulation)
    return Simulation.create(simulation, {
      include: [
        {
          model: SimulationElements,
          as: 'simulationItems'
        }
      ]
    }).catch(console.log);
  }
};
