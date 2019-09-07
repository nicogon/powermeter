module.exports = function devicesRepository(mongoClient) {
  return {
    list, upsert, del, get
  };


  function del(dispoId) {
    return mongoClient
      .collection('devices')
      .deleteOne({ dispoId });
  }

  async function get(dispoId) {
    return mongoClient
      .collection('devices')
      .findOne({ dispoId });
  }

  async function list() {
    return mongoClient
      .collection('devices')
      .find({})
      .toArray();
  }

  async function upsert(dispoId, data) {
    return mongoClient
      .collection('devices')
      .updateOne({ dispoId }, { $set: data }, { upsert: true });
  }
};
