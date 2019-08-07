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
    reporteId,
    dispoId,
    medicion,
    inicio,
    promedioMediciones,
    medicionMaxima,
    contadorMediciones,
    index,
    promedioMedicionesTotal,
    contadorMedicionesTotal,
    medicionMaximaTotal
  }) {
    console.log(promedioMedicionesTotal)
    return mongoClient.collection('reportes').updateOne(
      { reporteId },
      {
        $set: {
          promedioMediciones: promedioMedicionesTotal,
          medicionMaxima: medicionMaximaTotal,
          contadorMediciones: contadorMedicionesTotal,
          [`ultimasMediciones.${index}`]: medicion,
          [`mediciones.${dispoId}.medicion`]: medicion,
          [`mediciones.${dispoId}.lastPush`]: parseInt(Date.now() - inicio),
          [`mediciones.${dispoId}.promedioMediciones`]: promedioMediciones,
          [`mediciones.${dispoId}.medicionMaxima`]: medicionMaxima,
          [`mediciones.${dispoId}.contadorMediciones`]: contadorMediciones
        },
        $push: {
          [`mediciones.${dispoId}.data`]: {
            medicion,
            offset: parseInt(Date.now() - inicio)
          }
        }
      }
    );
  }

  // HACER QUE SEA EL ACTIVO FILTRAR
  async function getByDispoId(dispoId) {
    return mongoClient.collection('reportes').findOne(
      { sessionId, [`mediciones.${dispoId}`]: { $exists: true } },
      {
        projection: {
          reporteId: 1,
          inicio: 1,
          fin: 1,
          promedioMediciones: 1,
          medicionMaxima: 1,
          contadorMediciones: 1,
          ultimasMediciones: 1,
          [`mediciones.${dispoId}.lastPush`]: 1,
          [`mediciones.${dispoId}.index`]: 1,
          [`mediciones.${dispoId}.promedioMediciones`]: 1,
          [`mediciones.${dispoId}.medicionMaxima`]: 1,
          [`mediciones.${dispoId}.contadorMediciones`]: 1
        }
      }
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
