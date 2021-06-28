const express = require('express');
const bodyParser= require('body-parser');

const db = require("./model/connection");
const collection_admin = "Admin";
const collection_pasien = "Pasien";

const dir = "/view/admin"
const dir1 = "/view/pasien"

const app = express();
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/assets'));
app.engine('html', require('ejs').renderFile);

app.get('/admin/write', function(req, res) {
    res.sendFile(__dirname + dir + '/input.html')
})

app.get('/pasien/write', function(req, res) {
    res.sendFile(__dirname + dir1 + '/input.html')
})

app.get('/admin/read/table', function(req, res) {
    db.getDB().collection(collection_admin).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/pasien/read/table', function(req, res) {
    db.getDB().collection(collection_pasien).find().toArray()
    .then(results => {
        res.json(results)
    })
    .catch(error => console.error(error))
})

app.get('/testing', function(req, res) {
    res.render(__dirname + dir + '/view_tabel.ejs')
})

app.get('/admin/read', function(req, res) {
    db.getDB().collection(collection_admin).find().toArray()
    .then(results => {
        res.render(__dirname + dir + '/view.ejs', { hasil: results })
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

app.post('/admin/form_create', (req, res) => {
    db.getDB().collection(collection_admin).insertOne(req.body)
    .then(results => {
        res.redirect('/admin/write')
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

app.delete('/admin/delete', (req, res) => {
    db.getDB().collection(collection_admin).deleteOne(
    { username: req.body.name })
    .then(result => {
      res.json(`Deleted`)
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