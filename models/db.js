const mysql = require('mysql');
const router = require('../router');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dblogin'
});

conexion.connect((error)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log('Se conecto correctamente a la BD!!!')
});

module.exports= conexion;