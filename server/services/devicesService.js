module.exports = function devicesService(
  devicesRepository,
  reportsService,
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
    const timeDistance = Math.abs(dispo.lastPush - Date.now()) < 10000;
    return isSameSession && timeDistance;
  }

  function adaptDevices(dispo) {
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
    const dispo = await devicesRepository.get(dispoId);
    const lastConsumptions = [
      consumo,
      ...((dispo && dispo.lastConsumptions) || []).slice(0, 8)
    ];
    return lastConsumptions;
  }

  async function report(dispoId, data) {
   /*
   anda mal
    const lastConsumptions = await generateListLastConsumptions(
      dispoId,
      data.medicion
    );
    */
    await devicesRepository.upsert(dispoId, {
      sessionId,
      pinza: data.pinza,
      medicion: data.medicion,
      lastPush: Date.now()
    });

    await reportsService.notify(dispoId, data.medicion);
  }

  async function borrar(dispoId) {
    await devicesRepository.del(dispoId);
  }

  async function update(dispoId, name) {
    await devicesRepository.upsert(dispoId, {
      name
    });
  }

  async function list() {
    const listado = await devicesRepository.list();
    return listado.map(adaptDevices);
  }
};
