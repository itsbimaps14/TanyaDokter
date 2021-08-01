const collection_konsultasi = "Konsultasi"; 
const dir = "../view/konsultasi" 
const db = require("../model/connection.js")

// KONSULTASI KONSULTASI MODULE

exports.indexKonsultasi = async (req,res) => {
    res.redirect('/konsultasi/read')
}

exports.writeKonsultasi = async (req,res) => {
    const varCol = "Pasien";
    const varDok = "Dokter";
    db.getDB().collection(varCol).find(
        { },
        {username : 1, name : 1}
    ).toArray()
    .then(results1 => {
        db.getDB().collection(varDok).find(
            { },
            {username : 1, name : 1}
        ).toArray()
        .then(results2 => {
            //console.log(results)
            res.render(dir + '/input.ejs', { hasil1 : results1, hasil2 : results2  })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
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
    db.getDB().collection(collection_konsultasi).countDocuments()
    .then(results_cd => {
        db.getDB().collection(collection_konsultasi).insertOne(
            {
                id_konsultasi   : "KSL_" + results_cd,
                id_pasien       : req.body.id_pasien,
                id_dokter       : req.body.id_dokter,
                tanggal         : req.body.tanggal,
                jam_mulai       : req.body.jam_mulai,
                jam_selesai     : req.body.jam_selesai,
                diskusi         : [],
                status          : req.body.status
            }
        )
        .then(results => {
            res.redirect('/konsultasi/read')
        })
        .catch(error => console.error(error))
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
                    tanggal : req.body.tanggal,
                    jam_mulai : req.body.jam_mulai,
                    jam_selesai : req.body.jam_selesai,
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