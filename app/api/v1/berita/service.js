const bcrypt = require('bcrypt');
const admin = require("../../../utils/firebase")
const db = admin.firestore();
const beritaRef = db.collection('berita');

const create = async ( req) => {
  const beritaJson = {
    nama_info: req.body.nama_info,
    ket_info: req.body.ket_info,
    foto_info: req.body.foto_info
  };

  const docRef = await db.collection("berita").add(beritaJson);
  const response = await docRef.get();

  return response.data()
}


const get = async (req) => {
  let responseArr = [];
  let response

  if(req.query.nama_info ){
    response = await beritaRef.where("nama_info", "==", req.query.nama_info).get();
  }
  else{
    response = await beritaRef.get();
  }

  response.forEach(doc => {
    responseArr.push(doc.data());
  });

  return responseArr;
}

const getById = async (req) => {

  const beritaRef = db.collection("berita").doc(req.params.id);
    const response = await beritaRef.get();

    if (!response.exists) {
      res.status(404).send('Berita not found');
      return;
    }
  
    const beritaData = response.data();

    return [beritaData]; 
}

const edit = async (req) => {

  const id = req.params.id;
  const newNama_info = req.body.nama_info;
  const newKet_info = req.body.ket_info;
  const newFoto_info = req.body.foto_info;

  const beritaRef = db.collection("berita").doc(id); // Ubah ke koleksi "penjadwalan"
  const doc = await beritaRef.get();

  if (!doc.exists) {
      res.status(404).send({ message: 'Berita not found' });
      return;
  }

  const result = await beritaRef.update({
    nama_info: newNama_info,
    ket_info: newKet_info,
    foto_info: newFoto_info
  });
  
  return result;
}

const remove = async (req) => {

  const id = req.params.id;
  const beritaRef = db.collection("berita").doc(id);

  const doc = await beritaRef.get();
  if (!doc.exists) {
    res.status(404).send({ message: 'Berita not found' });
    return;
  }

  const response = await beritaRef.delete();
  
  return response;
}

module.exports={
    create,
    get,
    getById,
    edit,
    remove
}