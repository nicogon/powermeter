module.exports = function simulationsRepository(Simulation) {
  return { saveSimulation };

  async function saveSimulation({ name, kwhCost, durationInHours }) {
    Simulation.create({ name, durationInHours, kwhCost }).catch(console.log);
  }
};
