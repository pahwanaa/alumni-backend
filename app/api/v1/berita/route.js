const express = require("express")
const { createBerita, getBerita, getBeritaById, editBerita, deleteBerita } = require("./controller")
const router = express()

router.post ("/berita/create", createBerita)
router.get ("/berita/all", getBerita)
router.get ("/berita/:id", getBeritaById)
router.patch ("/berita/:id", editBerita)
router.delete ("/berita/:id", deleteBerita)

module.exports = router