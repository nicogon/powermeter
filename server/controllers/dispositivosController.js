module.exports = function dispositivosController(dispositivosService) {
  return { report, listar };

  async function report(req, res) {
    // mover al servuce
    await dispositivosService.report(req.params.dispoId);
    res.send(
      {}
      //
    );
  }

  async function listar(req, res) {
    const dispositivos = await dispositivosService.list();
    console.log(dispositivos);
    res.render('dispositivos', { dispositivos });

    // res.send(await dispositivosService.list());
  }
};


// <%=result%>:<%=results[result]%>