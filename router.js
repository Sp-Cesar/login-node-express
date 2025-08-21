const express = require('express');
const router = express.Router();
const conexion = require('./models/db');

router.get('/', (req,res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login:true,
            name: req.session.nombre
        });
    }else{
        res.render('index',{
            login:false,
            name: 'Porfavor inicie session'
        })
    };
});

router.get('/login', (req,res)=>{
    res.render('login', { datosErrore:''});
});

router.get('/register', (req,res)=>{
    res.render('register');
});

router.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})





//Invocamos la funcion Controller
const loginController = require('./controllers/loginController');
router.post('/register', loginController.register);
router.post('/auth', loginController.auth);

module.exports=router;