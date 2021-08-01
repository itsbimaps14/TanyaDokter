const express = require("express");
const pasienAPI = require("../model/pasien")
const router = express.Router();

router.get('/', pasienAPI.indexPasien)
router.get('/write', pasienAPI.writePasien)
router.get('/login', pasienAPI.loginPasien)
router.get('/read/table', pasienAPI.readTable)
router.get('/read', pasienAPI.read)
router.post('/form_create', pasienAPI.formCreate)
router.post('/login_create', pasienAPI.loginCreate)
router.get('/update/:username', pasienAPI.updateData)
router.post('/update', pasienAPI.updateForm)
router.get('/delete/:username', pasienAPI.deleteData)
router.get('/request', pasienAPI.requestKonsultasi)
router.get('/request/proses', pasienAPI.readRequestKonsultasi)
router.get('/request/proses/:dokter', pasienAPI.sendRequestKonsultasi)

module.exports = router