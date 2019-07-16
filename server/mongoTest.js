
const repo = require('./repositories/dispositivosRepository');


async function ejecutar() {
  // result = await repo.insertarDispositivo({pe:'re'});

  result = await repo.listarDispositivos();
  console.log(result);
}

ejecutar();
