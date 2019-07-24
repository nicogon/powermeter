module.exports = function dispositivosRepository(mongoClient) {
  return { list, upsert, del };

  async function del(dispoId) {
    return mongoClient
      .collection('dispositivos')
      .deleteOne({ dispoId });
  }

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
