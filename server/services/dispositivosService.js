module.exports = function dispositivosService(
  dispositivosRepository,
  reportesService,
  sessionId
) {
  return {
    list,
    report,
    update,
    borrar
  };

  function isOnline(dispo) {
    const isSameSession = sessionId === dispo.sessionId;
    const timeDistance = Math.abs(dispo.lastPush - Date.now()) < 5000;
    return isSameSession && timeDistance;
  }

  function adaptDispositivos(dispo) {
    const {
      name, dispoId, medicion, pinza, lastPush, lastConsumptions
    } = dispo;

    return {
      name,
      lastPush,
      dispoId,
      isOnline: isOnline(dispo),
      pinza,
      medicion,
      lastConsumptions
    };
  }

  async function generateListLastConsumptions(dispoId, consumo) {
    const dispo = await dispositivosRepository.get(dispoId);
    const lastConsumptions = [
      consumo,
      ...((dispo && dispo.lastConsumptions) || []).slice(0, 8)
    ];
    return lastConsumptions;
  }

  async function report(dispoId, data) {
    const lastConsumptions = await generateListLastConsumptions(
      dispoId,
      data.medicion
    );
    await dispositivosRepository.upsert(dispoId, {
      sessionId,
      pinza: data.pinza,
      medicion: data.medicion,
      lastPush: Date.now(),
      lastConsumptions
    });

    await reportesService.notify(dispoId, data.medicion);
  }

  async function borrar(dispoId) {
    await dispositivosRepository.del(dispoId);
  }

  async function update(dispoId, name) {
    await dispositivosRepository.upsert(dispoId, {
      name
    });
  }

  async function list() {
    const listado = await dispositivosRepository.list();
    return listado.map(adaptDispositivos);
  }
};
