module.exports = function reportesRepository(mongoClient, sessionId) {
  return {
    list, upsert, del, get, getByDispoId, pushMedicion
  };


  async function pushMedicion({ reporteId, dispoId, medicion }) {
    return mongoClient
      .collection('reportes').updateOne(
        { reporteId },
        { $push: { data: { dispoId, medicion } } }
      );
  }

  // HACER QUE SEA EL ACTIVO FILTRAR
  async function getByDispoId(dispoId) {
    return (mongoClient
      .collection('reportes')
      .findOne({ sessionId, mediciones: { $elemMatch: { dispoId } } }, { projection: { reporteId: 1 } }));
  }

  async function del(reporteId) {
    return mongoClient
      .collection('reportes')
      .deleteOne({ reporteId });
  }

  async function get(reporteId) {
    return mongoClient
      .collection('reportes')
      .findOne({ reporteId });
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
