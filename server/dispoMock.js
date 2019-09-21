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
      medition:  (contador % 7) + 10 ,
      sensibility: 30
    })
  }).catch(console.log);

  
  fetch(reportUrl(2), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medition:  (contador % 5) + 10 ,
      sensibility: 15
    })
  }).catch(console.log);

  fetch(reportUrl(3), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      medition:  (contador % 7) + 3 ,
      sensibility: 20
    })
  }).catch(console.log);
}

setInterval(() => { report(); }, 5000);
