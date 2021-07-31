const express = require('express');
const bodyParser= require('body-parser');

const db = require("./model/connection");
const collection_admin = "Admin";
const collection_pasien = "Pasien";
const collection_konsultasi = "Konsultasi";
const collection_transaksi = "Transaksi";
const collection_dokter = "Dokter";

const dir = "/view/admin"
const dir1 = "/view/pasien"
const dir2 = "/view/konsultasi"
const dir3 = "/view/transaksi"
const dir4 = "/view/dokter"

const app = express();
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/assets'));
app.engine('html', require('ejs').renderFile);

// ADMIN MODULE
app.get('/admin/write', function(req, res) {
    res.sendFile(__dirname + dir + '/input.html')
})

app.get('/admin/read/table', function(req, res) {
    db.getDB().collection(collection_admin).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/admin/read', function(req, res) {
    db.getDB().collection(collection_admin).find().toArray()
    .then(results => {
        res.render(__dirname + dir + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
})

app.post('/admin/form_create', (req, res) => {
    db.getDB().collection(collection_admin).insertOne(req.body)
    .then(results => {
        res.redirect('/admin/write')
    })
    .catch(error => console.error(error))
})


app.get('/admin/update/:username', (req, res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_admin).findOne({username : username})
    .then(results => {
        console.log(results)
        res.render(__dirname + dir + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
})

app.post('/admin/update', (req, res) => {
    db.getDB().collection(collection_admin).update(
        { username : req.body.username },
        {
            username : req.body.username,
            password : req.body.password,
            name : req.body.name
        }
    )
    .then(results => {
        res.redirect('/admin/read')
    })
    .catch(error => console.error(error))
})

app.get('/admin/delete/:username', (req, res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_admin).remove({username : username})
    .then(results => {
        console.log(results)
        res.redirect('/admin/read')
    })
    .catch(error => console.error(error))
})

// END OF ADMIN MODULE

// PASIEN MODULE

app.get('/pasien/write', function(req, res) {
    res.sendFile(__dirname + dir1 + '/input.html')
})

app.get('/pasien/read/table', function(req, res) {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/pasien/read', function(req, res) {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.render(__dirname + dir1 + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
})

app.post('/pasien/form_create', (req, res) => {
    db.getDB().collection(collection_pasien).insertOne(req.body)
    .then(results => {
        res.redirect('/pasien/write')
    })
    .catch(error => console.error(error))
})

app.get('/pasien/update/:username', (req, res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_pasien).findOne({username : username})
    .then(results => {
        console.log(results)
        res.render(__dirname + dir1 + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
})

app.post('/pasien/update', (req, res) => {
    db.getDB().collection(collection_pasien).update(
        { username : req.body.username },
        {
            username : req.body.username,
            password : req.body.password,
            name : req.body.name,
            telepon : req.body.telepon,
            email : req.body.email,
            provinci : req.body.provinci,
            kota : req.body.kota,
            kecamatan : req.body.kecamatan,
            detail : req.body.detail,
            kodepos : req.body.kodepos
        }
    )
    .then(results => {
        res.redirect('/pasien/read')
    })
    .catch(error => console.error(error))
})

app.get('/pasien/delete/:username', (req, res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_pasien).remove({username : username})
    .then(results => {
        console.log(results)
        res.redirect('/pasien/read')
    })
    .catch(error => console.error(error))
})

// END OF PASIEN MODULE

// KONSULTASI MODULE

app.get('/konsultasi/write', function(req, res) {
    res.sendFile(__dirname + dir2 + '/input.html')
})

app.get('/konsultasi/read/table', function(req, res) {
    db.getDB().collection(collection_konsultasi).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/konsultasi/read', function(req, res) {
    db.getDB().collection(collection_konsultasi).find().toArray()
    .then(results => {
        res.render(__dirname + dir2 + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
})

app.post('/konsultasi/form_create', (req, res) => {
    db.getDB().collection(collection_konsultasi).insertOne(req.body)
    .then(results => {
        res.redirect('/konsultasi/write')
    })
    .catch(error => console.error(error))
})

app.get('/konsultasi/update/:id_konsultasi', (req, res) => {
    var id_konsultasi = req.params.id_konsultasi
    //console.log(username)
    db.getDB().collection(collection_konsultasi).findOne({id_konsultasi : id_konsultasi})
    .then(results => {
        console.log(results)
        res.render(__dirname + dir2 + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
})

app.post('/konsultasi/update', (req, res) => {
    db.getDB().collection(collection_konsultasi).update(
        { id_konsultasi : req.body.id_konsultasi },
        {
            id_konsultasi : req.body.id_konsultasi,
            pasien : req.body.pasien,
            dokter : req.body.dokter,
            tanggal : req.body.tanggal,
            jam_mulai : req.body.jam_mulai,
            jam_selesai : req.body.jam_selesai,
            urutan : req.body.urutan,
            pengirim : req.body.pengirim,
            detail : req.body.detail,
            status : req.body.status
        }
    )
    .then(results => {
        res.redirect('/konsultasi/read')
    })
    .catch(error => console.error(error))
})

app.get('/konsultasi/delete/:id_konsultasi', (req, res) => {
    var id_konsultasi = req.params.id_konsultasi
    //console.log(username)
    db.getDB().collection(collection_konsultasi).remove({id_konsultasi : id_konsultasi})
    .then(results => {
        console.log(results)
        res.redirect('/konsultasi/read')
    })
    .catch(error => console.error(error))
})

// END OF KONSULTASI MODULE

// KONSULTASI TRANSAKSI MODULE

app.get('/transaksi/write', function(req, res) {
    res.sendFile(__dirname + dir3 + '/input.html')
})

app.get('/transaksi/read/table', function(req, res) {
    db.getDB().collection(collection_transaksi).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/transaksi/read', function(req, res) {
    db.getDB().collection(collection_transaksi).find().toArray()
    .then(results => {
        res.render(__dirname + dir3 + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
})

app.post('/transaksi/form_create', (req, res) => {
    db.getDB().collection(collection_transaksi).insertOne(req.body)
    .then(results => {
        res.redirect('/transaksi/write')
    })
    .catch(error => console.error(error))
})

app.get('/transaksi/update/:id_transaksi', (req, res) => {
    var id_transaksi = req.params.id_transaksi
    //console.log(username)
    db.getDB().collection(collection_transaksi).findOne({id_transaksi : id_transaksi})
    .then(results => {
        console.log(results)
        res.render(__dirname + dir3 + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
})

app.post('/transaksi/update', (req, res) => {
    db.getDB().collection(collection_transaksi).update(
        { id_transaksi : req.body.id_transaksi },
        {
            id_transaksi : req.body.id_transaksi,
            id_pengguna : req.body.id_pengguna,
            jenis : req.body.jenis,
            nominal : req.body.nominal
        }
    )
    .then(results => {
        res.redirect('/transaksi/read')
    })
    .catch(error => console.error(error))
})

app.get('/transaksi/delete/:id_transaksi', (req, res) => {
    var id_transaksi = req.params.id_transaksi
    //console.log(username)
    db.getDB().collection(collection_transaksi).remove({id_transaksi : id_transaksi})
    .then(results => {
        console.log(results)
        res.redirect('/transaksi/read')
    })
    .catch(error => console.error(error))
})

// END OF TRANSAKSI MODULE

// DOKTER MODULE

app.get('/dokter/write', function(req, res) {
    res.sendFile(__dirname + dir4 + '/input.html')
})

app.get('/dokter/read/table', function(req, res) {
    db.getDB().collection(collection_dokter).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/dokter/read', function(req, res) {
    db.getDB().collection(collection_dokter).find().toArray()
    .then(results => {
        res.render(__dirname + dir4 + '/view.ejs', { hasil: results })
    })
    .catch(error => console.error(error))
})

app.post('/dokter/form_create', (req, res) => {
    db.getDB().collection(collection_dokter).insertOne(req.body)
    .then(results => {
        res.redirect('/dokter/write')
    })
    .catch(error => console.error(error))
})

app.get('/dokter/update/:username', (req, res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_dokter).findOne({username : username})
    .then(results => {
        console.log(results)
        res.render(__dirname + dir1 + '/update.ejs', { hasil : results })
    })
    .catch(error => console.error(error))
})

app.post('/dokter/update', (req, res) => {
    db.getDB().collection(collection_dokter).update(
        { username : req.body.username },
        {
            username : req.body.username,
            password : req.body.password,
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
            string : req.body.string,
            saldo : req.body.saldo,
            status : req.body.status,
            harga : req.body.harga
        }
    )
    .then(results => {
        res.redirect('/dokter/read')
    })
    .catch(error => console.error(error))
})

app.get('/dokter/delete/:username', (req, res) => {
    var username = req.params.username
    //console.log(username)
    db.getDB().collection(collection_dokter).remove({username : username})
    .then(results => {
        console.log(results)
        res.redirect('/dokter/read')
    })
    .catch(error => console.error(error))
})

// END OF DOKTER MODULE

// ESENSIAL MODULE
app.get('/testing', function(req, res) {
    res.render(__dirname + dir + '/view_tabel.ejs')
})

db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});