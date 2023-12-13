const bcrypt = require('bcrypt');
const admin = require("../../../utils/firebase")
const db = admin.firestore();
const usersRef = db.collection('alumni');

const create = async ( req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const userJson = {
      nim: req.body.nim,
      nama: req.body.nama,
      tempat_lahir: req.body.tempat_lahir,
      tanggal_lahir: req.body.tanggal_lahir,
      alamat: req.body.alamat,
      no_telepon: req.body.no_telepon,
      email: req.body.email,
      password: hashedPassword,
      gelar_akademik: req.body.gelar_akademik,
      status: req.body.status,
      foto: req.body.foto,
    };
    
    const result = await db.collection("alumni").add(userJson);
    
    return result
}

const get = async ( req, res, next) => {

  let responseArr = [];
  const response = await usersRef.get();

  response.forEach(doc => {
    responseArr.push(doc.data());
  });
  
  return responseArr;
}

module.exports={
    create,
    get
}