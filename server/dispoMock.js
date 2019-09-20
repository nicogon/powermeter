require('dotenv').config();
const fetch = require('node-fetch');

const url = process.env.APP_URL || `http://${process.env.API_HOST_URL}:${process.env.PORT}`;
const reportUrl = dispoId => `${url}/devices/${dispoId}/report`;

let contador = 0;

function report() {
  // eslint-disable-next-line no-plusplus
  contador++;

  fetch(reportUrl(1), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medition: { value: (contador % 7) + 10 },
      sensor: { id: 35 },
      device: { id: 1 } // Ya me lo mandas por la URL param, para que me lo repetis en el body?
    })
  }).catch(console.log);

  fetch(reportUrl(2), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medition: { value: (contador % 5) + 10 },
      sensor: { id: 17 },
      device: { id: 2 }
    })
  }).catch(console.log);

  fetch(reportUrl(3), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medition: { value: (contador % 3) + 10 },
      sensor: { id: 21 },
      device: { id: 3 }
    })
  }).catch(console.log);
}

setInterval(() => { report(); }, 5000);
