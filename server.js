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
const dokterRoutes    = require('./controller/dokter');
const konsultasiRoutes    = require('./controller/konsultasi');

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

// Panggil Dokter
app.use('/dokter', dokterRoutes);

// Panggil Konsultasi
app.use('/konsultasi', konsultasiRoutes);

// // KONSULTASI MODULE

// app.get('/konsultasi/write', function(req, res) {
//     res.sendFile(__dirname + dir2 + '/input.html')
// })

// app.get('/konsultasi/read/table', function(req, res) {
//     db.getDB().collection(collection_konsultasi).find().toArray()
//     .then(results => {
//         res.json(results)
//     })
//     .catch(error => console.error(error))
// })

// app.get('/konsultasi/read', function(req, res) {
//     db.getDB().collection(collection_konsultasi).find().toArray()
//     .then(results => {
//         res.render(__dirname + dir2 + '/view.ejs', { hasil: results })
//     })
//     .catch(error => console.error(error))
// })

// app.post('/konsultasi/form_create', (req, res) => {
//     db.getDB().collection(collection_konsultasi).insertOne(req.body)
//     .then(results => {
//         res.redirect('/konsultasi/write')
//     })
//     .catch(error => console.error(error))
// })

// app.get('/konsultasi/update/:id_konsultasi', (req, res) => {
//     var id_konsultasi = req.params.id_konsultasi
//     //console.log(username)
//     db.getDB().collection(collection_konsultasi).findOne({id_konsultasi : id_konsultasi})
//     .then(results => {
//         console.log(results)
//         res.render(__dirname + dir2 + '/update.ejs', { hasil : results })
//     })
//     .catch(error => console.error(error))
// })

// app.post('/konsultasi/update', (req, res) => {
//     db.getDB().collection(collection_konsultasi).update(
//         { id_konsultasi : req.body.id_konsultasi },
//         {
//             id_konsultasi : req.body.id_konsultasi,
//             pasien : req.body.pasien,
//             dokter : req.body.dokter,
//             tanggal : req.body.tanggal,
//             jam_mulai : req.body.jam_mulai,
//             jam_selesai : req.body.jam_selesai,
//             urutan : req.body.urutan,
//             pengirim : req.body.pengirim,
//             detail : req.body.detail,
//             status : req.body.status
//         }
//     )
//     .then(results => {
//         res.redirect('/konsultasi/read')
//     })
//     .catch(error => console.error(error))
// })

// app.get('/konsultasi/delete/:id_konsultasi', (req, res) => {
//     var id_konsultasi = req.params.id_konsultasi
//     //console.log(username)
//     db.getDB().collection(collection_konsultasi).remove({id_konsultasi : id_konsultasi})
//     .then(results => {
//         console.log(results)
//         res.redirect('/konsultasi/read')
//     })
//     .catch(error => console.error(error))
// })

// // END OF KONSULTASI MODULE

// DOKTER MODULE

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