module.exports = function devicesService(devicesRepository, reportsService, sessionId, Device) {
  return {
    list, report, update, borrar
  };

  function isOnline(dispo) {
   // const isSameSession = sessionId === dispo.sessionId;
   const isSameSession = true;
   const timeDistance = Math.abs(dispo.lastPush - Date.now()) < 10000;
    return isSameSession && timeDistance;
  }

  function adaptDevices(dispo) {
    return {...dispo, isOnline: isOnline(dispo), name: dispo.name ? dispo.name : `Sensor ${dispo.id}`}
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
      ...data,
      lastPush: Date.now()
    });

    console.log(data.medition,"asdasdasdasdasdasdasd")
    await reportsService.notify(dispoId, data.medition).catch(console.log);
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
  //  const deviceslist = .map(device => adaptDevice(device));
    const listado = (await devicesRepository.list()).map(adaptDevices);
    if (process.env.SHOW_CONSOLE_LOGS === true) console.log(listado);
    return listado; // .map(adaptDevices);
  }
};
