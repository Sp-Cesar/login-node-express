const { name } = require('ejs');
const conexion = require('../models/db');
//Invocamos a bycriptjs
const bcrypt = require('bcryptjs');

exports.register = async(req, res)=>{
    const nombre = req.body.nombre;
    const user = req.body.user;
    const pass = req.body.pass;
    const rol = req.body.rol;
    let passHaash = await bcrypt.hash(pass, 8);
    console.log('Hash generado para la contraseña:', passHaash);
    conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, user:user, pass:passHaash, rol:rol},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/');
        }
    })
};

exports.auth = async(req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    if(user && pass){
        conexion.query('SELECT * FROM usuarios WHERE user = ?', [user],async(error,results)=>{
            // Si no se encuentra el usuario
            if (results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))){
                res.render('login', { datosErrore:'Contrasena o Usuario incorrecto'})
            }else{
                req.session.loggedin = true;
                req.session.nombre = results[0].nombre;
                res.redirect('/');
                
            }
        })
    }else{
        
        res.render('login', { datosErrore:'Ingrese los datos requeridos'});
    }
};

