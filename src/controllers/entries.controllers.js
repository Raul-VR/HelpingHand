//Esta es mi "base de datos" a arreglar
const entries = [];

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
    const newEntry = {
        title: req.body.username,
        content: req.body.password,
        published: new Date()
    }
    
    entries.push(newEntry);
    console.log(req.body);
    res.redirect('/')
};

const renderRecived = (req, res) => {
    res.render('recibido')
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
    renderChart
}