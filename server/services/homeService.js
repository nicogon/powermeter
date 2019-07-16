dispositivoGateway = require('../gateways/dispositivoGateway.js');

async function ponele() {
  return await dispositivoGateway.dameHora();
}

module.exports = { ponele };
