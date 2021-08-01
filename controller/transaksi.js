const express = require("express");
const transaksiAPI = require("../model/transaksi")
const router = express.Router();

router.get('/', transaksiAPI.indexTransaksi)
router.get('/write', transaksiAPI.writeTransaksi)
router.get('/read/table', transaksiAPI.readTable)
router.get('/read', transaksiAPI.read)
router.post('/form_create', transaksiAPI.formCreate)
router.get('/update/:id_transaksi', transaksiAPI.updateData)
router.post('/update', transaksiAPI.updateForm)
router.get('/delete/:id_transaksi', transaksiAPI.deleteData)

module.exports = router