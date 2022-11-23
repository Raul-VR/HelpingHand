//Esta es mi "base de datos" a arreglar
const entries = [];

// Database
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./def_data_fr.db',sqlite3. OPEN_READWRITE ,(err) => {
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
        published: new Date(),
        active: 1
    }
    const d = new Date();

    var sql ='INSERT INTO requests (username, description, severity, location, published, active) VALUES (?,?,?,?,?,?)'
    var params =[req.body.username, req.body.descripcion,req.body.severidad,req.body.latitude,d.toString(), 1]

    db.run(sql, params, function (err, result) {
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.redirect('/recibido')
    });

    //entries.push(newEntry);
    console.log(req.body);

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

            if (req.body.username == "admin" && req.body.password == "admin") {
                res.redirect('/chart')
            } else if (JSON.stringify(rows).length > 2) {
                // Redirect to home page
                res.redirect('/entries')
            } else {
                res.render('log-in')
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
        //tal vz db.run o db.each
        db.all(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
        res.redirect('/log-in');
        return;
        });


    } else {

        var sql ='INSERT INTO users (username, password) VALUES (?,?)'
        var params =[req.body.username, req.body.password, req.body.brigadista]
        db.all(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
    
            res.redirect('/log-in');
            return;
        });

    };
};

 const renderChart = (req, res) => {
    db.serialize(()=>{
        var a;
        var b;
        db.all('SELECT * FROM requests WHERE active= ?',["active"],(error, rows)=>{
            if (error){
                console.log(error);
            }
            a= rows.length;
            db.all('SELECT * FROM requests WHERE active= ?', ["noactive"],(error,rows)=>{
                if (error){
                    console.log(error);
                }
                b=rows.length;
                res.render('chart',{a:a,b:b}) //aquie enviamos los datos recabados el div del ejs
            });
        });
    });
 };

const renderEntries = (req, res) => {
    db.all('SELECT * FROM requests WHERE active = 1', [], function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }

        res.render('entries', {entries:result})
    });

    
};

//--------------------------------------------
const renderBrigade = (req, res) => {
    db.all('SELECT * FROM brigades', [], function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }

        res.render('brigades', {brigades:result})
    });
        // If there is an issue with the query, output the error
    var sql ='DELETE FROM brigades WHERE brigadeID=?'
    var params=[req.body.brigadeID]
}
//guardar los datos
const createEntries = (req, res) => {
    db.all('SELECT * FROM requests WHERE active = 1', [], function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }

        res.render('entries', {entries:result})
    });
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
    renderEntries,
    renderBrigade
}