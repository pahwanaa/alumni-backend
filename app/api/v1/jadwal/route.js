const express = require("express")
const { createJadwal, getJadwal, getAlumniById, editAlumni, deleteAlumni } = require("./controller")
const router = express()

router.post ("/jadwal/create", createJadwal)
router.get ("/jadwal/all", getJadwal)
router.get ("/alumni/:id", getAlumniById)
router.patch ("/alumni/update/:id", editAlumni)
router.delete ("/alumni/delete/:id", deleteAlumni)

module.exports = router