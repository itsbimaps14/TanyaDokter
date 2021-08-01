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
    db.getDB().collection(collection_admin).insertOne(req.body)
    .then(results => {
        res.redirect('/admin/read')
    })
    .catch(error => console.error(error))
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
    var saldoAkhir = parseInt(getPasienSaldo(req.body.id_pasien)) + parseInt(req.body.nominal);

    db.getDB().collection(varPasien).updateOne(
        { username : req.body.id_pasien },
        {
            $set : {
                    saldo : saldoAkhir
                }
        }
    )
    .then(results => {
        db.getDB().collection(varTrx).insertOne(
            {
                id_transaksi : getPasienUrutanTrx(),
                id_pengguna : req.body.id_pasien,
                nominal : req.body.nominal,
                jenis : "Deposit"
            }
        )
        .then(results => {
            res.redirect('/admin/topup')
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

// Modul Bantuan

getPasienSaldo = function (username) {
    const varCol = "Pasien";
    db.getDB().collection(varCol).findOne(
        {
            username : username
        }
    )
    .then(results => {
        return results.saldo;
    })
    .catch(error => console.error(error))
};

var getPasienUrutanTrx = function () {
    const varCol = "Pasien";
    db.getDB().collection(varCol).countDocuments()
    .then(results => {
        console.log(results + " - getPasienUrutan")
        return "TRX_" + results.toString();
    })
    .catch(error => console.error(error))
};