const collection_pasien = "Pasien";
const dir = "../view/pasien"
const db = require("../model/connection.js")

var session = null;

//Pasien MODUL

exports.indexPasien = async (req,res) => {
    res.redirect('/pasien/login')
}

// BATAS PUNYA ADMIN

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
    db.getDB().collection(collection_pasien).countDocuments()
    .then(results_cd => {
        db.getDB().collection(collection_pasien).insertOne(
            {
                id_pasien : "PSN_" + results_cd,
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
                },
                saldo : req.body.saldo,
                status : req.body.status
            }

        )
        .then(results => {
            res.redirect('/pasien/read')
        })
        .catch(error => console.error(error))
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
                    },
                    saldo : req.body.saldo,
                    status : req.body.status
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

// BATAS PUNYA ADMIN

exports.loginPasien = async (req,res) => {
    if(!session){
        res.render(dir + '/login.ejs')
    }
    else{
        res.redirect('/pasien/request');
    }
}

exports.loginCreate = async (req,res) => {
    
    db.getDB().collection(collection_pasien).findOne({username : req.body.username, password : req.body.password} ,function(err, user) { 
        if (user){
            session = req.session
            session.username = req.body.username;
            session.roles = "Pasien";
            res.redirect('/pasien/request');
        }
        else{
            res.redirect('/pasien/login');
        }  
    })
}

exports.requestKonsultasi = async (req,res) => {
    session = req.session;
    if (session.roles != "Pasien"){
        res.redirect('/pasien')
    }
    else{
        res.render(dir + '/request.ejs')
    }
}

exports.readRequestKonsultasi = async (req,res) => {
    const colDokter = "Dokter";

    db.getDB().collection(colDokter).find(
        {status : "Aktif"},
        {id_dokter:1, name:1, spesialis:1, harga:1, str:1}
    ).toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.sendRequestKonsultasi = async (req,res) => {
    const colDokter = "Konsultasi";
    var dokter = req.params.dokter
    
    db.getDB().collection(colDokter).countDocuments()
    .then(results_cd => {
        db.getDB().collection(colDokter).insertOne(
            {
                id_konsultasi   : "KSL_" + results_cd,
                id_pasien       : "Session",
                id_dokter       : dokter,
                tanggal         : "",
                jam_mulai       : "",
                jam_selesai     : "",
                diskusi         : [],
                status          : "Requested"
            }
        )
        .then(results => {
            res.redirect('/pasien/request');
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))

}

exports.konsulKonsultasi = async (req,res) => {
    session = req.session;
    if (session.roles != "Pasien"){
        res.redirect('/pasien/')
    }
    else{
        res.render(dir + '/konsul.ejs')
    }
}

exports.readKonsulKonsultasi = async (req,res) => {
    const colKon = "Konsultasi";
    const colDok = "Dokter";

    db.getDB().collection(colKon).aggregate([
        {
            $lookup:
              {
                from: colDok,
                let: { 
                    status : "$status",
                    id : "$id_dokter"
                },
                pipeline: [ {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: [ "$$id", "$id_dokter" ] },
                                { $eq: [ "$$status", "Accepted" ] }
                            ]
                        }
                    }
                },
                { $project: { name: 1, spesialis: 1, harga: 1} }
                ],
                as: "data_dokter"
              }
         },
         // Filter
         {
             $match: { "status" : "Accepted" }
         }
    ])
    .toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.sendKonsulKonsultasi = async (req,res) => {
    const col = "Konsultasi";
    var konsultasi = req.params.konsultasi
    var pasien = req.params.pasien
    
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
                jam_selesai : now_h,
                status : "Payment"
            }
        }
    )
    .then(results => {
        db.getDB().collection("Pasien").updateOne(
            { id_pasien : pasien },
            {
                $set : { 
                    status : "Belum Bayar"
                }
            }
        )
        .then(results => {
            res.redirect('/pasien/konsul');
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

exports.paymentKonsultasi = async (req,res) => {
    session = req.session;
    if (session.roles != "Pasien"){
        res.redirect('/pasien/')
    }
    else{
        res.render(dir + '/bayar.ejs')
    }
}

exports.readPaymentKonsultasi = async (req,res) => {
    const colKon = "Konsultasi";
    const colDok = "Dokter";

    db.getDB().collection(colKon).aggregate([
        {
            $lookup:
              {
                from: colDok,
                let: { 
                    status : "$status",
                    id : "$id_dokter"
                },
                pipeline: [ {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: [ "$$id", "$id_dokter" ] },
                                { $eq: [ "$$status", "Payment" ] }
                            ]
                        }
                    }
                },
                { $project: { name: 1, spesialis: 1, harga: 1} }
                ],
                as: "data_dokter"
              }
         },
         // Filter
         {
             $match: { "status" : "Payment" }
         }
    ])
    .toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error)) 
}

exports.sendPaymentKonsultasi = async (req,res) => {
    const col = "Konsultasi";
    var konsultasi = req.body.konsultasi
    var pasien = req.body.pasien

    db.getDB().collection(col).updateOne(
        { id_konsultasi : konsultasi },
        {
            $set : {
                status : "Selesai",
                nilai : parseInt(req.body.nilai)
            }
        }
    )
    .then(results => {
        db.getDB().collection("Pasien").updateOne(
            { id_pasien : pasien },
            {
                $set : { 
                    status : "OK"
                }
            }
        )
        .then(results => {
            res.redirect('/pasien/payment');
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

exports.nilaiPaymentKonsultasi = async (req,res) => {
    var konsultasi = req.params.konsultasi
    var pasien = req.params.pasien

    res.render(dir + '/nilai.ejs', { hasil1 : konsultasi, hasil2 : pasien })
}

exports.cekNilaiDokter = async (req,res) => {
    var dokter = req.params.dokter

    db.getDB().collection("Konsultasi").countDocuments({id_dokter : dokter})
    .then(total => {
        db.getDB().collection("Konsultasi").aggregate( 
            [   
                //Grouping + Sum
                {
                    $group : { 
                        _id : "$id_dokter", 
                        totalNilai : { $sum : "$nilai" } 
                    }
                },
                // Filter
                {
                    $match: { "_id" : dokter }
                }
            ]
        ).toArray()
        .then(totalNilai => {
            //console.log(total)
            //console.log(totalNilai[0].totalNilai)
            res.render(dir + '/cek_nilai.ejs', { 
                hasil : totalNilai[0].totalNilai/total, 
                totalKonsul : total,
                totalNilai : totalNilai[0].totalNilai
            })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}