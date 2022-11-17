//Esta es mi "base de datos" a arreglar
const entries = [];

// Database
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data.db',sqlite3. OPEN_READWRITE ,(err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Conected to database!');
})

const renderIndex = (req, res) => {
    res.render('index', {entries})
};

const createIndex = (req, res) => {
    res.redirect('log-in')

};

//ver el formulario
const renderNewEntry = (req, res) => {
    res.render('new-entry')
};

//guardar los datos
const createNewEntry = (req, res) => {
    const newEntry = {
        username: req.body.username,
        descripcion: req.body.descripcion,
        severidad: req.body.severidad,
        localizacion: req.body.localizacion,
        published: new Date()
    }
/*
    var sql ='INSERT INTO requests (username, description, severity, location, published) VALUES (?,?,?,?,?)'
    var params =[req.body.username, req.body.descripcion,req.body.severidad,req.body.localizacion,new Date()]
    db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.redirect('/entries')
    });
*/
    entries.push(newEntry);
    console.log(req.body);
    res.redirect('/entries')

};

const renderLogIn = (req, res) => {
    res.render('log-in')
};

//guardar los datos
const createLogIn = (req, res) => {
    
    var sql ='SELECT * FROM users WHERE username = ? AND password = ?'
    var params =[req.body.username, req.body.password]

    db.all(sql, params, function(err, rows) {
    // If there is an issue with the query, output the error
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }

        if (JSON.stringify(rows).length > 2) {
            // Redirect to home page
            res.redirect('/new-entry')
        } 
    });

    var sql ='SELECT * FROM brigades WHERE username = ? AND password = ?'
        var params =[req.body.username, req.body.password]
        db.all(sql, params, function(err, rows) {
        // If there is an issue with the query, output the error
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
    
            if (JSON.stringify(rows).length > 2) {
                // Redirect to home page
                res.redirect('/entries')
            } 

            //HACER UN ELSE, SI EXISTE NOMBRE ADMIN, INGRESAR A ADMIN
            //Pagina de admin tendra dos botones, ver todas las solicitudes, ver activas, pasadas, o chart
            //Se podria crear otro header para que diga administrator (igual podria haber headers personalizados para brigade y user)
            //Y otro else, si no existe, salirse y volver a cargar 

    });

    console.log("error")
};

const renderRecived = (req, res) => {
    res.render('recibido')
};


const renderSignUp = (req, res) => {
    res.render('sign-up')
};

//guardar los datos
const createSignUp = (req, res) => {
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        brigadista: req.body.brigadista
    }
    console.log(req.body);
    console.log(req.body.brigadista);
    if (req.body.brigadista){

        //var sql ='INSERT INTO users (username, password, brigadista) VALUES (?,?,?)'
        var sql ='INSERT INTO brigades (username, password) VALUES (?,?)'
        var params =[req.body.username, req.body.password]
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
        res.redirect('/log-in')
        return
        });


    } else {

        var sql ='INSERT INTO users (username, password) VALUES (?,?)'
        var params =[req.body.username, req.body.password, req.body.brigadista]
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
    
            res.redirect('/log-in')
            return
        });

    };
};


const renderChart = (req, res) => {
    res.render('Chart')
};

const renderEntries = (req, res) => {
    res.render('entries', {entries})
};

//guardar los datos
const createEntries = (req, res) => {
    res.render('entries', {entries})
};

module.exports = {
    renderIndex,
    createIndex,
    renderNewEntry,
    createNewEntry,
    renderLogIn,
    createLogIn,
    renderRecived,
    renderSignUp,
    createSignUp, 
    renderChart, 
    createEntries, 
    renderEntries
}