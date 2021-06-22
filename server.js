const express = require('express');
const bodyParser= require('body-parser');

const db = require("./model/connection");
const collection_admin = "Admin";

const dir = "/view/admin"

const app = express();
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/admin/write', function(req, res) {
    res.sendFile(__dirname + dir + '/input.html')
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