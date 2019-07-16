const mongoClientBuilder = require('./mongoClientFactory');


async function listar() {
  const mongo = await mongoClientBuilder();
  return mongo.collection('dispositivos').find({}).toArray();
}

async function insertar(dispositivo) {
  const mongo = await mongoClientBuilder();
  return mongo.collection('dispositivos').updateOne(
    { dispoId: dispositivo.dispoId },
    { $set: { name: 'name' } },
    { upsert: true },
  );
  //  return mongo.collection("dispositivos").insertOne(dispositivo);
}


module.exports = { listar, insertar };
