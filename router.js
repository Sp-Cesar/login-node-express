const express = require('express');
const router = express.Router();
const conexion = require('./models/db');

function checkAuth(req,res,next){
    if(req.session.loggedin){
        next();
    }else{
        res.redirect('/login');
    }
}


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
router.get('/productos', checkAuth, (req,res)=>{
    res.render('productos');
})
router.get('/carrito', checkAuth, (req,res)=>{
    res.render('carrito');
})





//Invocamos la funcion Controller
const loginController = require('./controllers/loginController');
router.post('/register', loginController.register);
router.post('/auth', loginController.auth);

module.exports=router;