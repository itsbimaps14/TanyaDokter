const collectionVar = "Dokter"; 
const dir = "../view/dokter" 
const db = require("../model/connection.js")

// DOKTER MODULE

exports.indexDokter = async (req,res) => {
    res.redirect('/dokter/login')
}

exports.writeDokter = async (req,res) => {
    res.render(dir + '/input.ejs')
}

exports.readTableDokter = async (req,res) => {
    db.getDB().collection(collectionVar).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.readDokter = async (req,res) => {
    db.getDB().collection(collectionVar).find().toArray()
    .then(results => {
        res.render(dir + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
}

exports.formCreateDokter = async (req,res) => {
    db.getDB().collection(collectionVar).insertOne(req.body)
    .then(results => {
        res.redirect('/dokter/read')
    })
    .catch(error => console.error(error))
}

exports.updateDataDokter = async (req,res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collectionVar).findOne({username : username})
    .then(results => {
        console.log(results)
        res.render(dir + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
}

exports.updateFormDokter = async (req,res) => {
    db.getDB().collection(collectionVar).updateOne(
        { username : req.body.username },
        {
            $set : {
                name : req.body.name,
                telepon : req.body.telepon,
                email : req.body.email,
                provinsipraktik : req.body.provinsipraktik,
                kotapraktik : req.body.kotapraktik,
                kecamatanpraktik : req.body.kecamatanpraktik,
                detailpraktik : req.body.detailpraktik,
                kodepospraktik : req.body.kodepospraktik,
                provinsi : req.body.provinsi,
                kota : req.body.kota,
                kecamatan : req.body.kecamatan,
                detail : req.body.detail,
                kodepos : req.body.kodepos,
                spesialis : req.body.spesialis,
                saldo : req.body.saldo,
                status : req.body.status,
                harga : req.body.harga
            }
        }
    )
    .then(results => {
        res.redirect('/dokter/read')
    })
    .catch(error => console.error(error))
}

exports.deleteDataDokter = async (req,res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collectionVar).remove({username : username})
    .then(results => {
        console.log(results)
        res.redirect('/dokter/read')
    })
    .catch(error => console.error(error))
}

exports.loginDokter = async (req,res) => {
    res.render(dir + '/login')
}

exports.loginAuth = async (req, res) => {
    db.getDB().collection(collectionVar).findOne({username : req.body.username, password : req.body.password} ,function(err, user) { 
        if (user && user.password === req.body.password){
            res.redirect('/dokter/dashboard');
        }
        else{
            res.redirect('/dokter/login');
        }
        
    })
}
// END OF TRANSAKSI MODULE