const express = require("express") ;
const app = express ();
const AlumniRouter = require("./app/api/v1/alumni/route")
const JadwalRouter = require("./app/api/v1/jadwal/route")
const BeritaRouter = require("./app/api/v1/berita/route")

app.use(express.json())
app.use(express.urlencoded ({extended: true}));

app.get('/', async(req, res)=>{
  res.send("This is API for Alumni app")
})

// Route to Alumni API
app.use('/api/v1/cms', AlumniRouter)
app.use('/api/v1/cms', JadwalRouter)
app.use('/api/v1/cms', BeritaRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log (`Server is running on PORT ${PORT}.`)
})