const fetch = require('node-fetch');
let contador = 0
function report() {
  contador ++;
  fetch('http://0.0.0.0:8081/dispositivos/medidor2/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      medicion: contador % 4 + 10,
      pinza: 35,
      dispoId: 'medidor2'
    })
  }).catch(console.log);
 
 /*
  fetch('http://0.0.0.0:8081/dispositivos/medidor1/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      medicion: contador % 3  + 10,
      pinza: 35,
      dispoId: 'medidor1'
    })
  }).catch(console.log);

  */
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
}, 5000);

/*
const repo = require('./repositories/dispositivosRepository');


async function ejecutar() {
  // result = await repo.insertarDispositivo({pe:'re'});

  result = await repo.listarDispositivos();
  console.log(result);
}

ejecutar();
*/
