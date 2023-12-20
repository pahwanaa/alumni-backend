const bcrypt = require('bcrypt');
const admin = require("../../../utils/firebase")
const db = admin.firestore();
const jadwalRef = db.collection('penjadwalan');

const create = async ( req) => {
  const jadwalJson = {
    nama: req.body.nama,
    keterangan: req.body.keterangan,
    tanggal: req.body.tanggal
  };

  const result = await db.collection("penjadwalan").add(jadwalJson);

  return result
}

const get = async (req) => {

  let responseArr = [];
  let response

  if(req.query.nama){
    response = await jadwalRef.where("nama", "==", req.query.nama).get();
  }else{
    response = await jadwalRef.get();
  }

  response.forEach(doc => {
    responseArr.push(doc.data());
  });

  return responseArr;
}

const getById = async (req) => {

  const jadwalRef = db.collection("penjadwalan").doc(req.params.id);
  const response = await jadwalRef.get();

  if (!response.exists) {
    throw new Error('Jadwal not found');
  }

  const jadwalData = response.data();

  return [jadwalData]; 
}

const edit = async (req) => {

  const id = req.params.id;
      const newNama = req.body.nama;
      const newKeterangan = req.body.keterangan;
      const newTanggal = req.body.tanggal;

      const jadwalRef = db.collection("penjadwalan").doc(id); // Ubah ke koleksi "penjadwalan"
      const doc = await jadwalRef.get();

      if (!doc.exists) {
          res.status(404).send({ message: 'Jadwal not found' });
          return;
      }

      const result = await jadwalRef.update({
          nama: newNama,
          keterangan: newKeterangan,
          tanggal: newTanggal
      });
  
  return result;
}

const remove = async (req) => {

  const id = req.params.id;
    const jadwalRef = db.collection("penjadwalan").doc(id);

    const doc = await jadwalRef.get();
    if (!doc.exists) {
      res.status(404).send({ message: 'Jadwal not found' });
      return;
    }

    const response = await jadwalRef.delete();
  
  return response;
}

module.exports={
    create,
    get,
    getById,
    edit,
    remove
}