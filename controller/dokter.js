const express = require("express");
const dokterAPI = require("../model/dokter")
const router = express.Router();

router.get('/', dokterAPI.indexDokter)
router.get('/write', dokterAPI.writeDokter)
router.get('/read/table', dokterAPI.readTableDokter)
router.get('/read', dokterAPI.readDokter)
router.post('/form_create', dokterAPI.formCreateDokter)
router.get('/update/:username', dokterAPI.updateDataDokter)
router.post('/update', dokterAPI.updateFormDokter)
router.get('/delete/:username', dokterAPI.deleteDataDokter)
router.get('/login', dokterAPI.loginDokter)
router.post('/login/auth', dokterAPI.loginAuth)
router.get('/accept', dokterAPI.acceptKonsultasi)
router.get('/accept/proses', dokterAPI.readAcceptKonsultasi)
router.get('/accept/proses/:konsultasi', dokterAPI.sendAcceptKonsultasi)
router.get('/konsul', dokterAPI.konsulKonsultasi)
router.get('/konsul/proses', dokterAPI.readKonsulKonsultasi)

router.get('/menu', dokterAPI.dokterMenu)
router.get('/data', dokterAPI.statusAkun)
router.post('/updateStatus', dokterAPI.updateStatus)
router.get('/logout', dokterAPI.logOut)

router.get('/konsul/chat/:konsultasi', dokterAPI.chat)

module.exports = router