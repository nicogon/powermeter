module.exports = function simulationsController(reportsService,simulationsService) {
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
        const reports = (await reportsService.list());
    
        res.render('newSimulation', { reports });
      }
  };
  
  