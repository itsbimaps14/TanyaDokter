const collection_konsultasi = "Konsultasi"; 
const dir = "../view/konsultasi" 
const db = require("../model/connection.js")

// KONSULTASI KONSULTASI MODULE

exports.indexKonsultasi = async (req,res) => {
    res.redirect('/konsultasi/read')
}

exports.writeKonsultasi = async (req,res) => {
    res.render(dir + '/input.ejs')
}

exports.readTable = async (req,res) => {
    db.getDB().collection(collection_konsultasi).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.read = async (req,res) => {
    db.getDB().collection(collection_konsultasi).find().toArray()
    .then(results => {
        res.render(dir + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
}

exports.formCreate = async (req,res) => {
    db.getDB().collection(collection_konsultasi).insertOne(req.body)
    .then(results => {
        res.redirect('/konsultasi/read')
    })
    .catch(error => console.error(error))
}

exports.updateData = async (req,res) => {
    var id_konsultasi = req.params.id_konsultasi
    //console.log(username)
    db.getDB().collection(collection_konsultasi).findOne({id_konsultasi : id_konsultasi})
    .then(results => {
        console.log(results)
        res.render(dir + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
}

exports.updateForm = async (req,res) => {
    db.getDB().collection(collection_konsultasi).updateOne(
        { id_konsultasi : req.body.id_konsultasi },
        {
            $set : {
                    pasien : req.body.pasien,
                    dokter : req.body.dokter,
                    tanggal : req.body.tanggal,
                    jam_mulai : req.body.jam_mulai,
                    jam_selesai : req.body.jam_selesai,
                    pengirim : req.body.pengirim,
                    detail : req.body.detail,
                    status : req.body.status
                }
        }
    )
    .then(results => {
        res.redirect('/konsultasi/read')
    })
    .catch(error => console.error(error))
}

exports.deleteData = async (req,res) => {
    var id_konsultasi = req.params.id_konsultasi
    //console.log(username)
    db.getDB().collection(collection_konsultasi).remove({id_konsultasi : id_konsultasi})
    .then(results => {
        console.log(results)
        res.redirect('/konsultasi/read')
    })
    .catch(error => console.error(error))
}

// END OF KONSULTASI MODULE