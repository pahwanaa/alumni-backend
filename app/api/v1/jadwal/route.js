const express = require("express")
const { createJadwal, getAlumni, getAlumniById, editAlumni, deleteAlumni } = require("./controller")
const router = express()

router.post ("/jadwal/create", createJadwal)
router.get ("/alumni/all", getAlumni)
router.get ("/alumni/:id", getAlumniById)
router.patch ("/alumni/update/:id", editAlumni)
router.delete ("/alumni/delete/:id", deleteAlumni)

module.exports = router