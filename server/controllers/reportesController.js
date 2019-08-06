module.exports = function reportesController(
  dispositivosService,
  reportesService
) {
  return {
    listar,
    crearNuevoReporte,
    detalleReporte,
    nuevoReporte
  };

  async function nuevoReporte(req, res) {
    // TODO

    const nombre = req.body.nombre;
    // eslint-disable-next-line radix
    const duracion = parseInt(req.body.duracion);
    const mediciones = {};
    if (typeof req.body.nombreMedicion === 'string') {
      mediciones[req.body.dispoId] = {
        dispoId: req.body.dispoId,
        nombreMedicion: req.body.nombreMedicion,
        data: []
      };
    } else {
      req.body.dispoId.forEach((dispoId, index) => {
        mediciones[dispoId] = {
          nombreMedicion: req.body.nombreMedicion[index],
          dispoId,
          data: []
        };
      });
    }
    const inicio = Date.now();
    const fin = Date.now() + duracion;

    const reporteId = await reportesService.nuevo({
      nombre,
      duracion,
      mediciones,
      inicio,
      fin
    });

    res.redirect(`/reportes/${reporteId}/`);
  }

  async function detalleReporte(req, res) {
    // TODO
    const reporteId = req.params.reporteId;
    const reporte = await reportesService.getReporte(reporteId);

    if (req.query.format === 'json') {
      res.json({ ...reporte, mediciones: Object.values(reporte.mediciones) });
    } else {
      res.render('reporte', { reporte });
    }
  }

  // refactolizar, cambiar nombre es confuso
  async function crearNuevoReporte(req, res) {
    // TODO
    /*
    const name = req.body.name;
    const duracion = req.body.duracion;

    const dispositivos = req.body.dispositivo((dispositivo) => {});
*/

    const dispositivos = (await dispositivosService.list()).filter(
      (dispositivo) => dispositivo.isOnline
    );

    res.render('nuevoReporte', { dispositivos });
  }

  async function listar(req, res) {
    // const dispositivos = await dispositivosService.list();
    res.render('reportes', {});
  }
};
