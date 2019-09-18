require('dotenv').config();
const fetch = require('node-fetch');

const apiHostUrl = process.env.API_HOST_URL || `localhost`;
const port = process.env.PORT || 8081;
const url = `http://${apiHostUrl}:${port}`;

var id_devise_1 = 'medidor1';
var id_devise_2 = 'medidor2';
var id_devise_3 = 'medidor3';

function report_url(dispo_id) { return `${ url }/devices/${ dispo_id }/report`; }

let contador = 0

function report() {
  contador ++;
  fetch(report_url(id_devise_1), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      medicion: contador % 5 + 10,
      pinza: 35,
      dispoId: 'medidor2'
    })
  }).catch(console.log);


  fetch(report_url(id_devise_2), {
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


}

fetch(report_url(id_devise_1), {
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
const repo = require('./repositories/devicesRepository');


async function ejecutar() {
  // result = await repo.insertardevice({pe:'re'});

  result = await repo.listardevices();
  console.log(result);
}

ejecutar();
*/
