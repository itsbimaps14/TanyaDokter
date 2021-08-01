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

// app.post('/admin/login_create', (req, res) => {
 
//     db.getDB().collection(collection_admin).findOne({username : req.body.username} ,function(err, user) { 
//         if (user && user.password === req.body.password){
//             res.redirect('/admin/write');
//         }
//         else{
//             res.redirect('/admin/login');
//         }
        
//     })
// })