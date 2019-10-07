require('dotenv').config();
const fetch = require('node-fetch');

const url = process.env.APP_URL || `http://${process.env.API_HOST_URL}:${process.env.PORT}`;
const reportUrl = dispoId => `${url}/sensores/${dispoId}/report`;

let contador = 0;

function report() {
  // eslint-disable-next-line no-plusplus
  contador++;

  fetch(reportUrl(1), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currentMedition: (contador % 7) + 10,
      sensibility: 30
    })
  }).catch(console.log);


  fetch(reportUrl(2), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currentMedition: ((contador % 10) > 5) ? 0 : 100,
      sensibility: 15
    })
  }).catch(console.log);

  /*
  fetch(reportUrl(3), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currentMedition: (contador % 7) + 3,
      sensibility: 20
    })
  }).catch(console.log);
  */
}

setInterval(() => { report(); }, 500);
