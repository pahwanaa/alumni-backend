const express = require("express")
const { createJadwal, getJadwal, getJadwalById, editJadwal, deleteJadwal } = require("./controller")
const router = express()

router.post ("/jadwal/create", createJadwal)
router.get ("/jadwal/all", getJadwal)
router.get ("/jadwal/:id", getJadwalById)
router.patch ("/jadwal/:id", editJadwal)
router.delete ("/jadwal/:id", deleteJadwal)

module.exports = router