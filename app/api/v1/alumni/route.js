const express = require("express")
const { createAlumni, getAlumni, getAlumniById, editAlumni, deleteAlumni } = require("./controller")
const router = express()

router.post ("/alumni/create", createAlumni)
router.get ("/alumni/all", getAlumni)
router.get ("/alumni/:id", getAlumniById)
router.patch ("/alumni/update/:id", editAlumni)
router.delete ("/alumni/delete/:id", deleteAlumni)

module.exports = router