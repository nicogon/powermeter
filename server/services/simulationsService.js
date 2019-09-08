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
        simulationId: "123",
        name: 'Casa Hector',
        duration: 900000,
        fixedCost: 1000,
        kwCost: 40,
        totalCost: 14000
      },
      {
        simulationId: "1234",
        name: 'Casa Nico',
        duration: 1800000,
        fixedCost: 500,
        kwCost: 30,
        totalCost: 12000
      },
      {
        simulationId: "1235",
        name: 'Casa Lucas',
        duration: 450000,
        fixedCost: 200,
        kwCost: 20,
        totalCost: 10000
      }];
    return mock;
  }

  async function create(simulation) {
    let averageConsumptions = []

    //Tiene sentido esto que estoy haciendo? un array de nombre y consumo? Donde lo guardo? Como lo uso?

    simulation.reports.forEach((reportId, index) => {
      const report = reportsService.getReport(reportId);
     
      report.mediciones.forEach((nombreMedicion, averageConsumption, duration) => {
        const medition = {
          name: nombreMedicion,
          totalConsumtion: averageConsumption * duration * simulation.kwCost //duration in hours
        }
        averageConsumptions.push(medition)
      })
    })

    //De donde sale el ID? ni idea
    const simulationId = "1234"
    return simulationId
  }


  function getSimulation(simulationId) {

    //Aca No entiendo como hace getReports, porque hace algo de ... que es medio raro, y si 
    //yo quieor ir al simulation repository, no existe, entonces.. como hago para obtenerlo? Ni idea
    return simulationRepository.getSimulation(simulationId)// reportsRepository.getReport(reportId);
  }
};
