const express = require('express');
const path = require('path');
const app = express();

//seteamos urlencode -> capturar el formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Motor de plantilla
app.set('views', path.join(__dirname, 'views')); // PARA INGRESAR LAS ALERTAS
app.set('view engine', 'ejs');


//Var de sesiones 
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//Invocamos a las rutas la cual tiene la Conexion a la base de datos
app.use('/', require('./router'))

app.listen(3000,()=>{
    console.log('Se esta ejecutando el servidor en http://localhost:3000');
});