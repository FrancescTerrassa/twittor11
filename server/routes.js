// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push=require('./push')

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  }
  mensajes.push( mensaje )
  console.log('post a mensajes:',mensajes)
  res.json({
    ok: true,
    mensaje
  })
})


// Almacenar la suscripción
router.post('/subscribe', (req, res) => {
  const suscripcion = req.body; 
  console.log('Subscribe:',suscripcion);
  push.addSubscription( suscripcion )
  res.json('subscribe')
})

// mandar key publico
router.get('/key', function (req, res) {
  const key = push.getKey()
  res.send(key)
  // res.json(key)
})


// Enviar una notificación push a las personas que queramos
// ES ALGO que se controla del lado del server
router.post('/push', function (req, res) {

  const post = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario:req.body.usuario
  }
  push.sendPush(post)
  res.json(post)
})

module.exports = router;