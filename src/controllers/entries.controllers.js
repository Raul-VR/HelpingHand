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
            res.render('new-entry')
        } 	else {

            var sql2 ='SELECT * FROM brigadista WHERE username = ? AND password = ?'
            var params2 =[req.body.username, req.body.password]
            db.all(sql2, params2, function(err, rows) {
            // If there is an issue with the query, output the error
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
        
                if (JSON.stringify(rows).length > 2) {
                    // Redirect to home page
                    res.redirect('/entries');
                } 	else {
                    
                    res.render('sign-up')
                    console.log("error")
                }
        
            });

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
        password: req.body.password,
        brigadista: req.body.brigadista
    }
    console.log(req.body);
    if (req.body.brigadista == null){
        var sql ='INSERT INTO users (username, password, access) VALUES (?,?,?)'
        var params =[req.body.username, req.body.password, req.body.brigadista]
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
    
            res.redirect('/log-in')
        });
    } else {
            //var sql ='INSERT INTO users (username, password, brigadista) VALUES (?,?,?)'
        var sql ='INSERT INTO brigadista (username, password, access) VALUES (?,?,?)'
        var params =[req.body.username, req.body.password, req.body.brigadista]
        db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.redirect('/log-in')
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