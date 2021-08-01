const express = require("express");
const adminAPI = require("../model/admin")
const router = express.Router();

router.get('/', adminAPI.indexAdmin)
router.get('/write', adminAPI.writeAdmin)
router.get('/read/table', adminAPI.readTable)
router.get('/read', adminAPI.read)
router.post('/form_create', adminAPI.formCreate)
router.get('/update/:username', adminAPI.updateData)
router.post('/update', adminAPI.updateForm)
router.get('/delete/:username', adminAPI.deleteData)

module.exports = router