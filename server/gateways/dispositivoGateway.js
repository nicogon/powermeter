const fetch = require("node-fetch");

async function dameHora() {
  const response = await fetch("http://worldtimeapi.org/api/timezone");

  return response.text();
}

module.exports = { dameHora };
