const express = require("express") ;
const app = express ();

const admin = require("firebase-admin") ;
const credentials = require("./key.json");
const bcrypt = require('bcrypt');

admin. initializeApp({
    credential: admin.credential. cert (credentials)
});

app.use(express.json());
app.use(express.urlencoded ({extended: true}));
const db = admin.firestore();
const usersRef = db.collection('alumni');
const jadwalRef = db.collection('penjadwalan');
const beritaRef = db.collection('berita');

//create data alumni
app.post('/alumni/create', async (req, res) => {
  try {
    console.log(req.body);
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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

    const response = await db.collection("alumni").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

//read all alumni
app.get('/alumni/all', async (req, res) => {
  try {
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch (error) {
    res.status(500).send(error);
  }
});

//read alumni by id
app.get('/alumni/:id', async (req, res) => {
  try {
    const userRef = db.collection("alumni").doc(req.params.id);
    const response = await userRef.get();

    if (!response.exists) {
      res.status(404).send('Alumni not found');
      return;
    }

    res.send(response.data());
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//edit alumni
app.patch('/alumni/update/:id', async (req, res) => {
    try {
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

      await userRef.update({
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
  
      res.send({ message: 'Alumni data updated successfully' });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

//delete alumni
app.delete('/alumni/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const userRef = db.collection("alumni").doc(id);
  
      const doc = await userRef.get();
      if (!doc.exists) {
        res.status(404).send({ message: 'Alumni not found' });
        return;
      }
  
      const response = await userRef.delete();
      res.send({ message: 'Alumni data deleted successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });




//create data jadwal
app.post('/jadwal/create', async (req, res) =>{
  try {
      console.log(req.body);
      const jadwalJson = {
        nama: req.body.nama,
        keterangan: req.body.keterangan,
        tanggal: req.body.tanggal
    };
    
    const docRef = await db.collection("penjadwalan").add(jadwalJson);
    const response = await docRef.get();
    
    res.send(response.data());
  } catch (error) {
      res.send (error);
  }
});

//read all jadwal
app.get('/read/jadwal/all', async (req, res) => {
  try {
      const response = await jadwalRef.get();
      let responseArr = [];
      response.forEach(doc => {
          responseArr.push(doc.data());
      });
      res.send(responseArr);
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
});

//read jadwal by id
app.get('/read/jadwal/:id', async(req, res) =>{
    try {
        const userRef = db.collection("penjadwalan").doc(req.params.id);
        const response = await userRef.get();

        if (!response.exists) {
          res.status(404).send('Jadwal not found');
          return;
        }

        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
})

//edit jadwal
app.patch('/update/jadwal/:id', async (req, res) => {
  try {
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

      await jadwalRef.update({
          nama: newNama,
          keterangan: newKeterangan,
          tanggal: newTanggal
      });

      res.send({ message: 'Jadwal data updated successfully' });
  } catch (error) {
      res.status(500).send(error);
  }
});

//delete jadwal
app.delete('/delete/jadwal/:id', async(req, res) =>{
  try {
    const id = req.params.id;
    const jadwalRef = db.collection("penjadwalan").doc(id);

    const doc = await jadwalRef.get();
    if (!doc.exists) {
      res.status(404).send({ message: 'Jadwal not found' });
      return;
    }

    const response = await jadwalRef.delete();
    res.send({ message: 'Jadwal data deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
})




//create data berita
app.post('/berita/create', async (req, res) => {
  try {
    console.log(req.body);

    const beritaJson = {
      nama_info: req.body.nama_info,
      ket_info: req.body.ket_info,
      foto_info: req.body.foto_info
    };

    const docRef = await db.collection("berita").add(beritaJson);
    const response = await docRef.get();

    res.send(response.data());
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//read all berita
app.get('/read/berita/all', async (req, res) => {
  try {
      const response = await beritaRef.get();
      let responseArr = [];
      response.forEach(doc => {
          responseArr.push(doc.data());
      });
      res.send(responseArr);
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
});

//read berita by id
app.get('/read/berita/:id', async(req, res) =>{
    try {
        const userRef = db.collection("berita").doc(req.params.id);
        const response = await userRef.get();

        if (!response.exists) {
          res.status(404).send('Berita not found');
          return;
        }

        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
})

//edit berita
app.patch('/update/berita/:id', async (req, res) => {
  try {
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

      await beritaRef.update({
        nama_info: newNama_info,
        ket_info: newKet_info,
        foto_info: newFoto_info
      });

      res.send({ message: 'Berita data updated successfully' });
  } catch (error) {
      res.status(500).send(error);
  }
});

//delete jadwal
app.delete('/delete/berita/:id', async(req, res) =>{
  try {
    const id = req.params.id;
    const beritaRef = db.collection("berita").doc(id);

    const doc = await beritaRef.get();
    if (!doc.exists) {
      res.status(404).send({ message: 'Berita not found' });
      return;
    }

    const response = await beritaRef.delete();
    res.send({ message: 'Berita data deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log (`Server is running on PORT ${PORT}.`)
})