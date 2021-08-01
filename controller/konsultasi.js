const express = require("express");
const konsultasiAPI = require("../model/konsultasi")
const router = express.Router();

router.get('/', konsultasiAPI.indexKonsultasi)
router.get('/write', konsultasiAPI.writeKonsultasi)
router.get('/read/table', konsultasiAPI.readTable)
router.get('/read', konsultasiAPI.read)
router.post('/form_create', konsultasiAPI.formCreate)
router.get('/update/:id_konsultasi', konsultasiAPI.updateData)
router.post('/update', konsultasiAPI.updateForm)
router.get('/delete/:id_konsultasi', konsultasiAPI.deleteData)

module.exports = router