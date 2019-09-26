module.exports = function meditionSimulationsRepository(MeditionSimulation, Simulation, Medition) {
  return { saveMeditionSimulation };

  async function saveMeditionSimulation({ SimulationId, sliders }) {
    MeditionSimulation.create(
      { SimulationId: 1, MeditionId: 1 },
      { include: [{ model: Simulation, as: 'simulation' }] }
    )
      .catch(console.log);
  }
};
