//Volver a instalar 
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Initializations
const app = express();


// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/entries.routes'));

// 404 handler
app.use((req, res) => {
    res.status(404).render('404' );
});

// Starting the app
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'))
});

// app.post('/chart', (req,res)=>{
//     db.serialize(()=>{
//         var a;
//         var b;
//         db.all('SELECT * FROM request WHERE active= ?', ["1"],(error, rows)=>{
//             if (error){
//                 console.log(error);
//             }
//             a= rows.lenght;
//             db.all('SELECT * FROM request WHERE active= ?', ["0"],(error,rows)=>{
//                 if (error){
//                     console.log(error);
//                 }
//                 b=rows.lenght;
//                 res.render('chart',{a:a,b:b}) //aquie enviamos los datos recabados el div del ejs
//             });
//         });
//     });
// });

//Para la grafica 


//Get location
// const successCallback = (position) => {
//     console.log(position); //posicion 
//   };
  
//   const errorCallback = (error) => {
//     console.log(error); //Error
//   };
  
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback); //Callback

//Obtener datos para nuestra Chart
