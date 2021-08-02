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
router.get('/konsul', pasienAPI.konsulKonsultasi)
router.get('/konsul/proses', pasienAPI.readKonsulKonsultasi)
router.get('/konsul/proses/:konsultasi/:pasien', pasienAPI.sendKonsulKonsultasi)
router.get('/payment', pasienAPI.paymentKonsultasi)
router.get('/payment/proses', pasienAPI.readPaymentKonsultasi)
router.post('/payment/proses/bayar', pasienAPI.sendPaymentKonsultasi)
router.get('/payment/proses/nilai/:konsultasi/:pasien', pasienAPI.nilaiPaymentKonsultasi)

router.get('/cek/nilai/:dokter', pasienAPI.cekNilaiDokter)

module.exports = router