module.exports = function devicesRepository(dispoMem) {
  return {
    list, upsert, del, get
  };


  function del(dispoId) {
    return {}
  }

  async function get(dispoId) {
    return {...dispoMem.find(dispo => dispo.dispoId = dispoId)};
  }

  async function list() {
    return dispoMem;
  }

  async function upsert(dispoId, data) {
    let dispo = dispoMem.findIndex(unit => unit.dispoId == dispoId);
    if(dispo==-1) {
      dispoMem.push({...data,dispoId:dispoId}) 
    }else{
      dispoMem[dispo] = {...dispoMem[dispo], ...data, dispoId};
    }
  }
  
  
};
