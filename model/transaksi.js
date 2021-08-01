const collection_transaksi = "Transaksi"; 
const dir = "../view/transaksi" 
const db = require("../model/connection.js")

// KONSULTASI TRANSAKSI MODULE

exports.indexKonsultasi = async (req,res) => {
    res.redirect('/transaksi/read')
}

exports.writeKonsultasi = async (req,res) => {
    res.render(dir + '/input.ejs')
}

exports.readTable = async (req,res) => {
    db.getDB().collection(collection_transaksi).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.read = async (req,res) => {
    db.getDB().collection(collection_transaksi).find().toArray()
    .then(results => {
        res.render(dir + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
}

exports.formCreate = async (req,res) => {
    db.getDB().collection(collection_transaksi).insertOne(req.body)
    .then(results => {
        res.redirect('/transaksi/read')
    })
    .catch(error => console.error(error))
}

exports.updateData = async (req,res) => {
    var id_transaksi = req.params.id_transaksi
    //console.log(username)
    db.getDB().collection(collection_transaksi).findOne({id_transaksi : id_transaksi})
    .then(results => {
        console.log(results)
        res.render(dir + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
}

exports.updateForm = async (req,res) => {
    db.getDB().collection(collection_transaksi).updateOne(
        { id_transaksi : req.body.id_transaksi },
        {
            $set : {
                    jenis : req.body.jenis,
                    nominal : req.body.nominal
                }
        }
    )
    .then(results => {
        res.redirect('/transaksi/read')
    })
    .catch(error => console.error(error))
}

exports.deleteData = async (req,res) => {
    var id_transaksi = req.params.id_transaksi
    //console.log(username)
    db.getDB().collection(collection_transaksi).remove({id_transaksi : id_transaksi})
    .then(results => {
        console.log(results)
        res.redirect('/transaksi/read')
    })
    .catch(error => console.error(error))
}

// END OF TRANSAKSI MODULE