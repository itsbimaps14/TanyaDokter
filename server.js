const express = require('express');
const bodyParser= require('body-parser');

const db = require("./model/connection.js")


const collection_pasien = "Pasien";
const collection_konsultasi = "Konsultasi";
const collection_dokter = "Dokter";


const dir1 = "/view/pasien"
const dir2 = "/view/konsultasi"
const dir4 = "/view/dokter"

const app = express();

// Routers
const transaksiRoutes    = require('./controller/transaksi');
const adminRoutes    = require('./controller/admin');
const pasienRoutes    = require('./controller/pasien');

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/assets'));
app.engine('html', require('ejs').renderFile);

// Panggil Controller
app.use('/transaksi', transaksiRoutes);

// Panggil Admin
app.use('/admin', adminRoutes);

// Panggil Pasien
app.use('/pasien', pasienRoutes);


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
        res.render(__dirname + dir4 + '/update.ejs', { hasil : results })
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

app.get('/dokter/login', function(req, res) {
    res.sendFile(__dirname + dir4 + '/login.html')
})


app.post('/dokter/login_create', (req, res) => {
 
    db.getDB().collection(collection_dokter).findOne({username : req.body.username} ,function(err, user) { 
        if (user && user.password === req.body.password){
            res.redirect('/dokter/write');
        }
        else{
            res.redirect('/dokter/login');
        }
        
    })
});

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