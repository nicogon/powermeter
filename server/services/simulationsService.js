const _ = require('lodash');

module.exports = function simulationsService() {
    return {
      list
    };
    async function list() {
      mock = [
        {
          simulationId:"123",
          name: 'Casa Hector',
          duration: 900000,
          fixedCost: 1000,
          kwCost: 40,
          totalCost: 14000
      }, 
      {
        simulationId:"1234",
        name: 'Casa Nico',
        duration: 1800000,
        fixedCost: 500,
        kwCost: 30,
        totalCost: 12000
    },  
    {
        simulationId:"1235",
        name: 'Casa Lucas',
        duration: 450000,
        fixedCost: 200,
        kwCost: 20,
        totalCost: 10000
    }];
      return mock;
    }
  };
  