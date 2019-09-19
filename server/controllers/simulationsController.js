module.exports = function simulationsController(reportsService,simulationsService) {
    return {
      simulations,
      createNewSimulation,
      newSimulation,
      simulationDetails
    };
  
    async function simulations(req, res) {
        const simulations = (await simulationsService.list());

        res.render('simulations', { simulations });
    }

    async function createNewSimulation(req, res) {
        const reports = (await reportsService.list());
        res.render('newSimulation', { reports });
      }

      // const name = req.body.name; va a agarrar lo que está en el ejs con el name = "name"y lo vamos a poder usar
      // si quiero trabajar con numeros, tengo que usar la función parseInt(req.body.duration)
      /*
      switch(duracion){
        case '1':

      }
      En el caso de los reportes, puede  venir 1 o muchos, si vienen muchos,  vienen como array.
      Si viene uno, viene como String

      */

      async function newSimulation(req, res) {
        const name = req.body.name;
        const duration = parseInt(req.body.duration);
        let durationInHours
        switch(duration) {
          case 1: durationInHours = 24 * 7
          case 2: durationInHours = 24 * 14
          case 3: durationInHours = 24 * 21
          case 4: durationInHours = 24 * 28
          case 5: durationInHours = 24 * 30
          break;
        }
        const simulation = {
                              reports:[]
                           };

        simulation.name = name
        simulation.duration = durationInHours
        simulation.kwCost = 30 //TODO: Ponerlo en el form
        if (typeof req.body.reportId === 'string') {
          simulation.reports.push(req.body.reportId);
        } else {
          req.body.reportId.forEach((reportId, index) => {
            simulation.reports.push(reportId);
          });
        }

        simulationId = await simulationsService.create(simulation);      
        res.redirect(`/simulations/${simulationId}/`);

          // throw new Error();

      }

      async function simulationDetails(req, res) {
        const simulationId = req.params.simulationId;
        const simulation = await simulationsService.getSimulation(simulationId);
    
        res.render('simulation', { simulation });
      }
    
  };
  
  