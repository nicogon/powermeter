module.exports = function simulationsController(reportesService) {
    return {
      simulations,
      createNewSimulation
    };
  
    async function simulations(req, res) {
        res.render('simulations', {  });
    }

    async function createNewSimulation(req, res) {
        const reports = (await reportesService.list());
    
        res.render('newSimulation', { reports });
      }
  };
  
  