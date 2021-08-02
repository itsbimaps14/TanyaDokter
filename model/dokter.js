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
    db.getDB().collection(collectionVar).countDocuments()
    .then(results_cd => {
        db.getDB().collection(collectionVar).insertOne(
            {
                id_dokter : "DKT_" + results_cd,
                username  : req.body.username,
                password  : req.body.password,
                name      : req.body.name,
                telepon   : req.body.telepon,
                email     : req.body.email,
                alamat    : {
                    praktik   : {
                        provinsi  : req.body.provinsipraktik,
                        kota      : req.body.kotapraktik,
                        kec       : req.body.kecamatanpraktik,
                        detail    : req.body.detailpraktik,
                        kode_pos  : req.body.kodepospraktik,
                    },
                    tinggal   : {
                        provinsi  : req.body.provinsi,
                        kota      : req.body.kota,
                        kec       : req.body.kecamatan,
                        detail    : req.body.detail,
                        kode_pos  : req.body.kodepos,
                    }
                },
                spesialis : req.body.spesialis,
                str       : req.body.str,
                saldo     : req.body.saldo,
                status    : req.body.status,
                harga     : req.body.harga
            }
        )
        .then(results => {
            res.redirect('/dokter/read')
        })
        .catch(error => console.error(error))
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
                alamat    : {
                    praktik   : {
                        provinsi  : req.body.provinsiP,
                        kota      : req.body.kotaP,
                        kec       : req.body.kecP,
                        detail    : req.body.detailP,
                        kode_pos  : req.body.kode_posP,
                    },
                    tinggal   : {
                        provinsi  : req.body.provinsi,
                        kota      : req.body.kota,
                        kec       : req.body.kec,
                        detail    : req.body.detail,
                        kode_pos  : req.body.kode_pos,
                    }
                },
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
        if (user){
            res.redirect('/dokter/dashboard');
        }
        else{
            res.redirect('/dokter/login');
        }
        
    })
}

exports.acceptKonsultasi = async (req,res) => {
    res.render(dir + '/accept.ejs')
}

exports.readAcceptKonsultasi = async (req,res) => {
    const colKon = "Konsultasi";
    const colPasien = "Pasien";

    db.getDB().collection(colKon).aggregate([
        {
            $lookup:
              {
                from: colPasien,
                //localField: "id_pasien",
                //foreignField: "id_pasien",
                let: { 
                    status : "$status",
                    id : "$id_pasien"
                },
                pipeline: [ {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: [ "$$id", "$id_pasien" ] },
                                { $eq: [ "$$status", "Requested" ] }
                            ]
                        }
                    }
                },
                { $project: { name: 1 } }
                ],
                as: "data_pasien"
              }
         },
         // Filter
         {
             $match: { "status" : "Requested" }
         }
    ])
    .toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.sendAcceptKonsultasi = async (req,res) => {
    const col = "Konsultasi";
    var konsultasi = req.params.konsultasi
    
    // get jam now
    var today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes()),
        yy = checkTime(today.getFullYear()),
        mm = checkTime(parseInt(today.getMonth() + 1)),
        dd = checkTime(today.getDate());

    var now_h = h + ":" + m;
    var now_d = dd + "/" + mm + "/" + yy;

    db.getDB().collection(col).updateOne(
        { id_konsultasi : konsultasi },
        {
            $set : {
                tanggal : now_d,   
                jam_mulai : now_h,
                status : "Accepted"
            }
        }
    )
    .then(results => {
        res.redirect('/dokter/accept/');
    })
    .catch(error => console.error(error))

}

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}
// END OF TRANSAKSI MODULE