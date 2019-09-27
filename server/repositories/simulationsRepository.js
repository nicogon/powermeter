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

  async function index() {
    return Simulation.findAll({ raw: true }).catch(console.log);
  }

  async function show(simulationId) {
    return Simulation.findByPk(simulationId, { raw: true }).catch(console.log);
  }

  async function destroy(simulationId) {
    return Simulation.destroy(
      { where: { id: simulationId } }
    ).catch(console.log);
  }
};
