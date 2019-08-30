module.exports = function simulationsController(reportesService,simulationsService) {
    return {
      simulations,
      createNewSimulation
    };
  
    async function simulations(req, res) {
        console.log("PASE")
        const simulations = (await simulationsService.list());

        res.render('simulations', { simulations });
    }

    async function createNewSimulation(req, res) {
        const reports = (await reportesService.list());
    
        res.render('newSimulation', { reports });
      }
  };
  
  