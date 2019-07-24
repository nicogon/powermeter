const fetch = require('node-fetch');

function report() {
  fetch('http://0.0.0.0:8081/dispositivos/medidor1/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      medicion: Math.floor(Math.random() * 6) + 1,      
      pinza: 35,
      dispoId: 'medidor1'
    })
  }).catch(console.log);
}

fetch('http://0.0.0.0:8081/dispositivos/unicavez/report', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    medicion: 33,
    pinza: 35,
    dispoId: 'unicavez'
  })
}).catch(console.log);

setInterval(function () {
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
