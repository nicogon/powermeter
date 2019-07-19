module.exports = function dispositivosService(
  dispositivosRepository,
  sessionId
) {
  return { list, report };

  //    { lastPush: Date.now(), sessionId }

  function adaptDispositivos(dispo) {
    const { name, dispoId, sensibility } = dispo;
    return {
      name,
      dispoId,
      isOnline: sessionId === dispo.sessionId,
      sensibility
    };
  }

  async function report(dispoId) {
    await dispositivosRepository.upsert(dispoId, {
      sessionId,
      lastPush: Date.now()
    });
  }

  async function list() {
    const listado = await dispositivosRepository.list();
    return listado.map(adaptDispositivos);
  }
};
