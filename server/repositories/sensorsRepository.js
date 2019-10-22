/* eslint-disable no-param-reassign */
module.exports = function sensorsRepository(dispoMem, Sensor) {
  return {
    list, upsert, del, get
  };


  function del(dispoId) {
    return Sensor.destroy({
      where: {
        id: dispoId
      }
    });
  }

  async function get(dispoId) {
    return { ...dispoMem.find(dispo => dispo.dispoId = dispoId) };
  }

  async function list() {
    return Sensor.findAll({ raw: true });
  }

  async function upsert(dispoId, data) {
    Sensor.upsert({
      id: dispoId,
      ...data
    });
  }
};
