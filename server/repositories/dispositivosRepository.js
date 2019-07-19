module.exports = function dispositivosRepository(mongoClient) {
  return { list, upsert };

  async function list() {
    return mongoClient
      .collection('dispositivos')
      .find({})
      .toArray();
  }

  async function upsert(dispoId, data) {
    return mongoClient
      .collection('dispositivos')
      .updateOne({ dispoId }, { $set: data }, { upsert: true });
  }
};
