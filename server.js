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

app.delete('/admin/delete', (req, res) => {
    db.getDB().collection(collection_admin).deleteOne(
    { username: req.body.name })
    .then(result => {
      res.json(`Deleted`)
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


app.get('/pasien/write', function(req, res) {
    res.sendFile(__dirname + dir1 + '/input.html')
})

app.get('/konsultasi/write', function(req, res) {
    res.sendFile(__dirname + dir2 + '/input.html')
})

app.get('/transaksi/write', function(req, res) {
    res.sendFile(__dirname + dir3 + '/input.html')
})

app.get('/pasien/read/table', function(req, res) {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/konsultasi/read/table', function(req, res) {
    db.getDB().collection(collection_konsultasi).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/transaksi/read/table', function(req, res) {
    db.getDB().collection(collection_transaksi).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/dokter/read/table', function(req, res) {
    db.getDB().collection(collection_dokter).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/testing', function(req, res) {
    res.render(__dirname + dir + '/view_tabel.ejs')
})



app.get('/pasien/read', function(req, res) {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.render(__dirname + dir1 + '/view.ejs', { hasil: results })
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

app.get('/transaksi/read', function(req, res) {
    db.getDB().collection(collection_transaksi).find().toArray()
    .then(results => {
        res.render(__dirname + dir3 + '/view.ejs', { hasil: results })
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

app.post('/pasien/form_create', (req, res) => {
    db.getDB().collection(collection_pasien).insertOne(req.body)
    .then(results => {
        res.redirect('/pasien/write')
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

app.post('/transaksi/form_create', (req, res) => {
    db.getDB().collection(collection_transaksi).insertOne(req.body)
    .then(results => {
        res.redirect('/transaksi/write')
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