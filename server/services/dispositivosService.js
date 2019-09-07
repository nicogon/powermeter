module.exports = function dispositivosService(
  dispositivosRepository,
  reportesService,
  sessionId
) {
  return {
    list,
    report,
    actualizar,
    borrar
  };

  function isOnline(dispo) {
    const isSameSession = sessionId === dispo.sessionId;
    const timeDistance = Math.abs(dispo.lastPush - Date.now()) < 5000;
    return isSameSession && timeDistance;
  }

  function adaptDispositivos(dispo) {
    const {
      name, dispoId, medicion, pinza, lastPush, ultimosConsumos
    } = dispo;

    return {
      name,
      lastPush,
      dispoId,
      isOnline: isOnline(dispo),
      pinza,
      medicion,
      ultimosConsumos
    };
  }

  async function generarListaUltimosConsumos(dispoId, consumo) {
    const dispo = await dispositivosRepository.get(dispoId);
    const ultimosConsumos = [
      consumo,
      ...((dispo && dispo.ultimosConsumos) || []).slice(0, 8)
    ];
    return ultimosConsumos;
  }

  async function report(dispoId, data) {
    const ultimosConsumos = await generarListaUltimosConsumos(
      dispoId,
      data.medicion
    );
    await dispositivosRepository.upsert(dispoId, {
      sessionId,
      pinza: data.pinza,
      medicion: data.medicion,
      lastPush: Date.now(),
      ultimosConsumos
    });

    await reportesService.notify(dispoId, data.medicion);
  }

  async function borrar(dispoId) {
    await dispositivosRepository.del(dispoId);
  }

  async function actualizar(dispoId, name) {
    await dispositivosRepository.upsert(dispoId, {
      name
    });
  }

  async function list() {
    const listado = await dispositivosRepository.list();
    return listado.map(adaptDispositivos);
  }
};
