module.exports = function sensorsRepository(dispoMem, Sensor) {
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
    return Sensor.findAll({ raw: true });
    // return Sensor.findAll({ raw: true }) //return dispoMem;
  }

  async function upsert(dispoId, data) {
    Sensor.upsert({
      id:dispoId,
       ...data 
    });
   /*
    const dispo = dispoMem.findIndex(unit => unit.dispoId == dispoId);
    if (dispo == -1) {
      dispoMem.push({ ...data, dispoId });
    }else {
      dispoMem[dispo] = { ...dispoMem[dispo], ...data, dispoId };
    } */
  }
};
