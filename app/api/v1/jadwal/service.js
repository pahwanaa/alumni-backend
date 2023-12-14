const bcrypt = require('bcrypt');
const admin = require("../../../utils/firebase")
const db = admin.firestore();

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

  let responseArr = [];
  const response = await usersRef.get();

  response.forEach(doc => {
    responseArr.push(doc.data());
  });
  
  return responseArr;
}

const getById = async (req) => {

  const userRef = db.collection("alumni").doc(req.params.id);
    const response = await userRef.get();

    if (!response.exists) {
      res.status(404).send('Alumni not found');
      return;
    }
  
  return response;
}

const edit = async (req) => {

  const id = req.params.id;
  const NewNim = req.body.nim; 
  const NewNama = req.body.nama;
  const NewTempat_lahir = req.body.tempat_lahir;
  const NewTanggal_lahir = req.body.tanggal_lahir;
  const NewAlamat = req.body.alamat;
  const NewNo_telepon = req.body.no_telepon;
  const NewEmail = req.body.email;
  const NewGelar_akademik = req.body.gelar_akademik;
  const NewStatus = req.body.status;
  const NewFoto = req.body.foto;
  const NewPassword = req.body.password;

  if (!NewPassword) {
    return res.status(400).send({ message: 'New password is required' });
  }

  const userRef = db.collection("alumni").doc(id);
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(404).send({ message: 'Alumni not found' });
  return;
  }
  const hashedNewPassword = await bcrypt.hash(NewPassword, 10);

  const result = await userRef.update({
    nim: NewNim,
    nama: NewNama,
    tempat_lahir: NewTempat_lahir,
    tanggal_lahir: NewTanggal_lahir,
    alamat: NewAlamat,
    no_telepon: NewNo_telepon,
    email: NewEmail,
    gelar_akademik: NewGelar_akademik,
    status: NewStatus,
    foto: NewFoto,
    password: hashedNewPassword, // Update the hashed password
  });
  
  return result;
}

const remove = async (req) => {

  const id = req.params.id;
  const userRef = db.collection("alumni").doc(id);
  
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(404).send({ message: 'Alumni not found' });
    return;
  }

  const response = await userRef.delete();
  
  return response;
}

module.exports={
    create,
    get,
    getById,
    edit,
    remove
}