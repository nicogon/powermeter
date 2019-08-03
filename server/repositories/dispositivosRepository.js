module.exports = function dispositivosRepository(mongoClient) {
  return {
    list, upsert, del, get
  };

 


  async function del(dispoId) {
    return mongoClient
      .collection('dispositivos')
      .deleteOne({ dispoId });
  }

  async function get(dispoId) {
    return mongoClient
      .collection('dispositivos')
      .findOne({ dispoId });
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
