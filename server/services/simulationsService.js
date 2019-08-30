const _ = require('lodash');

module.exports = function simulationsService() {
    return {
      list
    };
    async function list() {
      mock = [
        {
          simulationId:"123",
          name: 'Cocina',
          duracion: 900000,
          fixedCost: 1000,
          kwCost: 40,
          totalCost: 10000
      }, 
      {
        simulationId:"123",
        name: 'Cocina',
        duracion: 900000,
        fixedCost: 1000,
        kwCost: 40,
        totalCost: 10000
    },  
    {
        simulationId:"123",
        name: 'Cocina',
        duracion: 900000,
        fixedCost: 1000,
        kwCost: 40,
        totalCost: 10000
    }];
      return mock;
    }
  };
  