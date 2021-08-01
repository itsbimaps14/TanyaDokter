const express = require('express');
const bodyParser= require('body-parser');

const db = require("./model/connection.js")

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