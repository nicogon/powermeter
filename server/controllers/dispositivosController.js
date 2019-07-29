module.exports = function dispositivosController(dispositivosService) {
  return {
    report,
    listar,
    actualizar,
    borrar
  };

  async function actualizar(req, res) {
    console.log('ACTUALIZAR');
    await dispositivosService.actualizar(req.params.dispoId, req.body.name);
    res.status(200).send();
  }

  async function borrar(req, res) {
    console.log('BORRAR');
    await dispositivosService.borrar(req.params.dispoId);
    res.status(200).send();
  }

  async function report(req, res) {
    // mover al servuce
    await dispositivosService.report(req.params.dispoId, req.body);
    res.status(200).send();
  }

  async function listar(req, res) {
    const dispositivos = await dispositivosService.list();
    if (req.query.format == 'json') {
      res.json(dispositivos);
    } else {
      res.render('dispositivos', { dispositivos });
    }

    // res.send(await dispositivosService.list());
  }
};

// <%=result%>:<%=results[result]%>
