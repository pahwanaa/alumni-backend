const express = require("express") ;
const app = express ();
const admin = require("./app/utils/firebase")
const bcrypt = require('bcrypt');
const AlumniRouter = require("./app/api/v1/alumni/route")
const JadwalRouter = require("./app/api/v1/jadwal/route")


app.use(express.json())
app.use(express.urlencoded ({extended: true}));


const db = admin.firestore();
const beritaRef = db.collection('berita');

app.get('/', async(req, res)=>{
  res.send("This is API for Alumni app")
})

// Route to Alumni API
app.use('/api/v1/cms', AlumniRouter)
app.use('/api/v1/cms', JadwalRouter)

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