const collection_admin = "Admin";
const dir = "../view/admin"
const db = require("../model/connection.js")

//Admin MODUL

exports.indexAdmin = async (req,res) => {
    res.redirect('/admin/read')
}

exports.writeAdmin = async (req,res) => {
    res.render(dir + '/input.ejs')
}

exports.readTable = async (req,res) => {
    db.getDB().collection(collection_admin).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.read = async (req,res) => {
    db.getDB().collection(collection_admin).find().toArray()
    .then(results => {
        res.render(dir + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
}

exports.formCreate = async (req,res) => {
    db.getDB().collection(collection_admin).countDocuments()
    .then(results_cd => {
        db.getDB().collection(collection_admin).insertOne({
            id_admin : "ADM_" + results_cd,
            username : req.body.username,
            password : req.body.password,
            name : req.body.name,
        })
        .then(results => {
            res.redirect('/admin/read')
        })
        .catch(error => console.error(error))
    })
}

exports.updateData = async (req,res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_admin).findOne({username : username})
    .then(results => {
        console.log(results)
        res.render(dir + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
}

exports.updateForm = async (req,res) => {
    db.getDB().collection(collection_admin).updateOne(
        { username : req.body.username },
        {
            $set : {
                    password : req.body.password,
                    name : req.body.name
                }
        }
    )
    .then(results => {
        res.redirect('/admin/read')
    })
    .catch(error => console.error(error))
}

exports.deleteData = async (req,res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_admin).remove({username : username})
    .then(results => {
        console.log(results)
        res.redirect('/admin/read')
    })
    .catch(error => console.error(error))
}

exports.loginAdmin = async (req,res) => {
    res.render(dir + '/login.ejs')
}

exports.loginCreate = async (req,res) => {
    db.getDB().collection(collection_admin).findOne({username : req.body.username, password : req.body.password} ,function(err, user) { 
        if (user && user.password === req.body.password){
            res.redirect('/admin/write');
        }
        else{
            res.redirect('/admin/login');
        }  
    })
}

exports.deposit = async (req, res) => {
    const varCol = "Pasien";
    db.getDB().collection(varCol).find(
        { },
        {username : 1, name : 1}
    ).toArray()
    .then(results => {
        //console.log(results)
        res.render(dir + '/top_up.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
}

exports.authDeposit = async (req, res) => {
    const varPasien = "Pasien";
    const varTrx = "Transaksi";
    const varCol = "Pasien";

    db.getDB().collection(varCol).findOne({username : req.body.id_pasien})
    .then(results_saldo => {
        console.log("ambil saldo awal")
        /// depth 2
        var total = parseInt(results_saldo.saldo) + parseInt(req.body.nominal)
        db.getDB().collection(varPasien).updateOne(
            { username : req.body.id_pasien },
            {$set : {saldo : total}}
        )
        .then(results => {
            console.log("hitung total")
            const varPas = "Pasien";
            db.getDB().collection(varTrx).countDocuments()
            .then(results_cd => {
                console.log("hitung dokumen")
                db.getDB().collection(varTrx).insertOne(
                    {
                        id_transaksi : "TRX_" + results_cd,
                        id_pengguna : req.body.id_pasien,
                        nominal : req.body.nominal,
                        jenis : "Deposit"
                    }
                )
                .then(results_depth4 => {
                    console.log("insert transaksi")
                    res.redirect('/admin/topup')
                })
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}