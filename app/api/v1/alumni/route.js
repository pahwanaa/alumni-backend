const express = require("express")
const { createAlumni, getAlumni } = require("./controller")
const router = express()

router.post ("/alumni/create", createAlumni)
router.get ("/alumni/all", getAlumni)

// router.get('/alumni/all', async (req, res) => {
//     try {
//       const response = await usersRef.get();
//       let responseArr = [];
//       response.forEach(doc => {
//         responseArr.push(doc.data());
//       });
//       res.send(responseArr);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

module.exports = router