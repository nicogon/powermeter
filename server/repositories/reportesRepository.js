module.exports = function reportesRepository(mongoClient, sessionId) {
  return {
    list,
    upsert,
    del,
    getByDispoId,
    pushMedicion,
    getReporte
  };

  async function pushMedicion({
    reporteId, dispoId, medicion, inicio
  }) {
    return mongoClient.collection('reportes').updateOne(
      { reporteId },
      {
        $set: { [`mediciones.${dispoId}.lastPush`]: parseInt(Date.now() - inicio) },
        $push: {
          [`mediciones.${dispoId}.data`]: {medicion, offset: parseInt(Date.now() - inicio) }
        }
      }
    );
  }

  // HACER QUE SEA EL ACTIVO FILTRAR
  async function getByDispoId(dispoId) {
    return mongoClient
      .collection('reportes')
      .findOne(
        { sessionId, [`mediciones.${dispoId}`]: { $exists: true } },
        { projection: { reporteId: 1, inicio: 1, fin:1,  [`mediciones.${dispoId}.lastPush`]:1 } }
      );
  }

  async function del(reporteId) {
    return mongoClient.collection('reportes').deleteOne({ reporteId });
  }

  async function getReporte(reporteId) {
    return mongoClient.collection('reportes').findOne({ reporteId });
  }

  async function list() {
    return mongoClient
      .collection('reportes')
      .find({})
      .toArray();
  }

  async function upsert(reporteId, data) {
    return mongoClient
      .collection('reportes')
      .updateOne({ reporteId }, { $set: data }, { upsert: true });
  }
};
