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

  const docRef = await db.collection("penjadwalan").add(jadwalJson);
  const response = await docRef.get();

  return response
}

const get = async () => {
  
  const response = await jadwalRef.get();
    let responseArr = [];
    response.forEach(doc => {
        responseArr.push(doc.data());
    });
  
  return responseArr;
}

const getById = async (req) => {

  const userRef = db.collection("penjadwalan").doc(req.params.id);
    const response = await userRef.get();

    if (!response.exists) {
      res.status(404).send('Jadwal not found');
      return;
    }
  
  return response.data();
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