const collection_pasien = "Pasien";
const dir = "../view/pasien"
const db = require("../model/connection.js")

//Pasien MODUL

exports.indexPasien = async (req,res) => {
    res.redirect('/pasien/read')
}

exports.writePasien = async (req,res) => {
    res.render(dir + '/input.ejs')
}

exports.readTable = async (req,res) => {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.read = async (req,res) => {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.render(dir + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
}

exports.formCreate = async (req,res) => {
    db.getDB().collection(collection_pasien).insertOne(
        {
            id_pasien : req.body.id_pasien,
            username : req.body.username,
            password : req.body.password,
            name : req.body.name,
            telepon : req.body.telepon,
            email : req.body.email,
            alamat : {
                provinci : req.body.provinci,
                kota : req.body.kota,
                kecamatan : req.body.kecamatan,
                detail : req.body.detail,
                kodepos : req.body.kodepos
            }
        }

    )
    .then(results => {
        res.redirect('/pasien/read')
    })
    .catch(error => console.error(error))
}

exports.updateData = async (req,res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_pasien).findOne({username : username})
    .then(results => {
        console.log(results)
        res.render(dir + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
}

exports.updateForm = async (req,res) => {
    db.getDB().collection(collection_pasien).updateOne(
        { username : req.body.username },
        {
            $set : {
                    password : req.body.password,
                    name : req.body.name,
                    telepon : req.body.telepon,
                    email : req.body.email,
                    alamat : {
                        provinci : req.body.provinci,
                        kota : req.body.kota,
                        kecamatan : req.body.kecamatan,
                        detail : req.body.detail,
                        kodepos : req.body.kodepos
                    }
                }
        }
    )
    .then(results => {
        res.redirect('/pasien/read')
    })
    .catch(error => console.error(error))
}

exports.deleteData = async (req,res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_pasien).remove({username : username})
    .then(results => {
        console.log(results)
        res.redirect('/pasien/read')
    })
    .catch(error => console.error(error))
}

exports.loginPasien = async (req,res) => {
    res.render(dir + '/login.ejs')
}

exports.loginCreate = async (req,res) => {
    db.getDB().collection(collection_pasien).findOne({username : req.body.username, password : req.body.password} ,function(err, user) { 
        if (user && user.password === req.body.password){
            res.redirect('/pasien/write');
        }
        else{
            res.redirect('/pasien/login');
        }  
    })
}