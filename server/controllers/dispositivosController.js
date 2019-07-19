module.exports = function dispositivosController(dispositivosService) {
  return { report, listar };

  async function report(req, res) {
    // mover al servuce
    res.send(
      {},
    //  await dispositivosService.insert({ dispoId: req.params.dispoId })
    );
  }

  async function listar(req, res) {
    res.send(await dispositivosService.list());
  }
};
