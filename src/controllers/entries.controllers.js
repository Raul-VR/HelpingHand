//Esta es mi "base de datos" a arreglar
const entries = [];

// Database
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./sqlite.db',sqlite3. OPEN_READWRITE ,(err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Conected to database!');
})

const renderIndex = (req, res) => {
    res.render('index', {entries})
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
    entries.push(newEntry);
    console.log(req.body);
    res.redirect('/')

};

const renderLogIn = (req, res) => {
    res.render('log-in')
};

//guardar los datos
const createLogIn = (req, res) => {
    
    var sql ='SELECT * FROM identifier WHERE user = ? AND password = ?'
    var params =[req.body.username, req.body.password]
    db.all(sql, params, function(err, rows) {
    // If there is an issue with the query, output the error
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }

        if (JSON.stringify(rows).length > 2) {
            // Redirect to home page
            res.render('index')
        } 	else {
            res.render('sign-up')
            console.log("error")
        }

    });
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
        password: req.body.password //,
        //brigadista: req.body.brigadista
    }
    entries.push(newUser);
    console.log(req.body);
    //var sql ='INSERT INTO users (username, password, brigadista) VALUES (?,?,?)'
    var sql ='INSERT INTO identifier (user, password) VALUES (?,?)'
    var params =[req.body.username, req.body.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }

        res.redirect('/log-in')
    });
};


const renderChart = (req, res) => {
    res.render('Chart')
};

module.exports = {
    renderIndex,
    renderNewEntry,
    createNewEntry,
    renderLogIn,
    createLogIn,
    renderRecived,
    renderSignUp,
    createSignUp, 
    renderChart
}