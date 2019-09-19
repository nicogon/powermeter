module.exports = function devicesRepository(dispoMem, sensor) {
  return {
    list, upsert, del, get
  };


  function del(dispoId) {
    return {};
  }

  async function get(dispoId) {
    return { ...dispoMem.find(dispo => dispo.dispoId = dispoId) };
  }

  async function list() {
    return sensor.findAll({ raw: true })//return dispoMem;
  }

  async function upsert(dispoId, data) {
    const dispo = dispoMem.findIndex(unit => unit.dispoId == dispoId);
    if (dispo == -1) {
      dispoMem.push({ ...data, dispoId });
    }else {
      dispoMem[dispo] = { ...dispoMem[dispo], ...data, dispoId };
    }
  }
};
