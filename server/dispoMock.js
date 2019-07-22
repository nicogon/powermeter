const fetch = require('node-fetch');

function report() {
  fetch('http://0.0.0.0:8080/dispositivos/putita/report', {
    method: 'POST',
    body: { medicion: 33 }
  }).catch(console.log);
}

setInterval(function() {
  report();
}, 3000);

/*
const repo = require('./repositories/dispositivosRepository');


async function ejecutar() {
  // result = await repo.insertarDispositivo({pe:'re'});

  result = await repo.listarDispositivos();
  console.log(result);
}

ejecutar();
*/
