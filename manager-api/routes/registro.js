const express = require('express');
const router = express.Router();
const formdataOperacionesService = require('./formdataOperaciones.service');

// routes
router.post('/crearEventoOperaciones', creareventooperaciones);

module.exports = router;

function creareventooperaciones(req, res, next) {
    formdataOperacionesService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
// REVISAR HACIA ARRIBA
//este archivo habilita las respuestas en la API
var express = require('express');
var app = express();////extra
var router = express.Router();
var mongoose = require('mongoose');
var ejs = require('ejs');
var fs = require('fs');
/* var Evento = require('../models/Evento.js');
var Informe = require('../models/Informe.js'); */
var ObjectId = require('mongodb').ObjectId;
const util = require('util')

app.use(express.static('./templates'));

const sendEmail = require('./transport.js');

var templateString = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correo.ejs', 'utf-8');
var templateStringNoEvents = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correoNoEvents.ejs', 'utf-8');
var templateString1Evento = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correo1evento.ejs', 'utf-8');

router.get('/sendMailOperaciones/:data', function(req, res, next) {
  message = ejs.render(templateString1Evento, {
    result: 'test',
    remitente: 'soportebitc13@gmail.cl',
    fechaInf: '29/04/2020'
  });
  sendEmail('jcaguirre@13.cl', 'Notificacion eventos BIT', message);
  // console.log(req.params.listado.replace(/"/g, ''));
  // console.log(req.params.fechaInf);
  // var listaEventos = [];
  // var query = { _id: new ObjectId(req.params.listado.replace(/"/g, ''))}
/*   Evento.findOne(query, function(err, post) {
    console.log(post);
    message = ejs.render(templateString1Evento, {
      result: post,
      remitente: req.params.remitente,
      fechaInf: req.params.fechaInf.split("T")[0]
    });
    sendEmail(req.params.correo, 'Notificacion eventos BIT', message);
  });
 */
  // console.log('##############################################' + req.params.correo, listaEventos);
  res.json({
    envio: 'ok'
  })
});
/* 
router.get('/sendMail/:correo/:listado/:remitente/:turno/:fechaInf', function(req, res, next) {
  var listaEventos = [];
  var Sequence = exports.Sequence || require('sequence').Sequence,
      sequence = Sequence.create(),
      err;
  var array = req.params.listado.split(',');
  console.log('##############################################' + array.length);
  if (req.params.listado !== '[]') {
    sequence.then(function(next) {
      setTimeout(function() {
          for (var i = 0, len = array.length; i < len; i++) {
              Evento.findById(array[i], function(err, post) {
                  listaEventos.push(post)
              })
          }
          next(err, listaEventos)
      }, 500)
  }).then(function(next, err, listaEventos) {
      setTimeout(function() {
          fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          console.log(req.params.fechaInf);
          var arr = req.params.fechaInf.split(" ");
          message = ejs.render(templateString, {
              result: listaEventos,
              fecha: fecha,
              remitente: req.params.remitente,
              turno: req.params.turno,
              fechaInf: arr[2] + ' ' + arr[1] + ' ' + arr[3]
          });
          console.log('##############################################' + req.params.correo, listaEventos);
          sendEmail(req.params.correo, 'Notificacion eventos BIT', message);
          next(err)
      }, 500)
  });
  } else {
    console.log('no events');
    var arr = req.params.fechaInf.split(" ");
    message = ejs.render(templateStringNoEvents, {
        remitente: req.params.remitente,
        turno: req.params.turno,
        fechaInf: arr[2] + ' ' + arr[1] + ' ' + arr[3]
    });
    sendEmail(req.params.correo, 'Notificacion eventos BIT', message);
    console.log('##############################################' + req.params.correo, listaEventos);

  }

  res.json({
      envio: 'ok'
  })
});

router.get('/queryTimesbyparameters/:key/:value/:fechaIni/:fechaFin', function(req, res, next) {

  console.log('********************key: ' + req.params.key);
  console.log('********************value: ' + req.params.value);
  console.log('********************fechaIni: ' + req.params.fechaIni);
  console.log('********************fechaFin: ' + req.params.fechaFin);
  key = req.params.key;
  value = req.params.value;
  Registro.count({[key]: value, fechaevento: {$gte: req.params.fechaIni, $lt: req.params.fechaFin}},function (err, registro) {
          if (err) return next(err);
          res.json({value: registro});
        });
});
router.get('/queryDobleParametro/:key1/:value1/:key2/:value2/:fechaIni/:fechaFin', function(req, res, next) {
  console.log('********************key: ' + req.params.key1);
  console.log('********************value: ' + req.params.value1);
  console.log('********************fechaIni: ' + req.params.fechaIni);
  key1 = req.params.key1;
  value1 = req.params.value1;
  key2 = req.params.key2;
  value2 = req.params.value2;
  Registro.count({[key1]: value1, [key2]: value2, fechaevento: {$gte: req.params.fechaIni, $lt: req.params.fechaFin}},function (err, registro) {
          if (err) return next(err);
          console.log(key1,value1,key2,value2);
          console.log('************value: ' + registro);//OK
          res.json({value: registro, key: value2});
        });
});
router.get('/Informes', function(req, res, next) {
  Informe.find(function (err, registro) {
    if (err) return next(err);
    res.json(registro);
  });
});
router.get('/Informes/LastId', function(req, res, next) {
  Informe.find().limit(1).sort({$natural:-1}).exec(function(err, registro) {
    if (err) return next(err);
    console.log('**************InformeId: ' + JSON.parse(JSON.stringify(registro)));
    console.log(util.inspect(JSON.parse(JSON.stringify(registro)), {showHidden: false, depth: null})[0].InformeId);
    res.json(registro);
  });
});
router.get('/Eventos', function(req, res, next) {
  Evento.find(function (err, registro) {
    if (err) return next(err);
    res.json(registro);
  });
});
router.get('/Eventos/Last', function(req, res, next) {
  Evento.find().limit(1).sort({'eventoId':-1}).exec(function(err, registro) {
    if (err) return next(err);
    console.log('**************InformeId: ' + JSON.parse(JSON.stringify(registro)));
    res.json(registro);
  });
});
router.get('/Users', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});
router.get('/Users/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });});
router.get('/Users/username/:username', function(req, res, next) {
  User.findOne({username:req.params.username}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });});
router.post('/Users/username/:username', function(req, res, next) {
  User.remove({username:req.params.username}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });});
router.post('/Informe', function(req, res, next) {
  console.log('crear informe: ', req);
  Informe.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.post('/Evento', function(req, res, next) {
  console.log('crear evento: ', req);
  Evento.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log('************' + post["_id"])
    var query = {_id:new ObjectId(post["_id"])}
    Evento.findOneAndUpdate(query, {$set:{eventoId : post["_id"]}}, function (err, post2) {   // Funciona OK
    if (err) return next(err);
    console.log('*************revisar post2' + post2);
    });
    res.json(post);
  });
});
router.get('/Campos/:key', function(req, res, next) {
  Campo.find({key:req.params.key},function (err, campos) {
    if (err) return next(err);
    res.json(campos);
  });
});
router.post('/Campos/update', function(req, res, next) {
  console.log('post');
  Campo.insertMany(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.post('/Campos', function(req, res, next) {
  console.log('post');
  Campo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.post('/Campos/remove/:key', function(req, res, next) {
  Campo.remove({key:req.params.key},function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.post('/', function(req, res, next) {
  console.log('post');
  Registro.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/Evento/:eventoId', function(req, res, next) {
  Evento.findById(ObjectId(req.params.eventoId), function (err, post) {
    if (err) return next(err);
    res.json(post);
  });});

router.put('/Evento/:eventoId', function(req, res, next) {
  var query = { _id: new ObjectId(req.params.eventoId)}
  Evento.findOneAndUpdate(query, {$set:req.body}, function (err, post) {
      console.log(req.body)
      if (err) return next(err);
      res.json(post);
  });
});

router.put('/Evento', function(req, res, next) {
  var query = { _id: new ObjectId(req.body["eventoId"])}
  Evento.findOneAndUpdate(query, {$set:req.body}, function (err, post) {
      console.log(req.body)
      if (err) return next(err);
      res.json(post);
  });
});

router.put('/informado/:id', function(req, res, next) {
  Registro.findByIdAndUpdate(req.params.id, {$set: {informado : true}}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Registro.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

module.exports = router;
 */