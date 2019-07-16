
const repositorioDispositivos = require('../repositories/dispositivosRepository');

async function report(req, res) {
  // mover al servuce
  res.send(await repositorioDispositivos.insertar({ dispoId: req.params.dispoId }));
}


async function listar(req, res) {
  res.send(await repositorioDispositivos.listar());
}
module.exports = { report, listar };
