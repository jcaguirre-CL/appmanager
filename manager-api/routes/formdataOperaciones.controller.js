const express = require('express');
const router = express.Router();
const formdataOperacionesService = require('./formdataOperaciones.service');

// routes
router.post('/crearEventoOperaciones', creareventooperaciones);
router.post('/crearProduccion', crearproduccion);
router.get('/recuperarRegistrosAll', recuperarregistrosall);
router.put('/modificarEventoOperaciones', modificareventooperaciones);

module.exports = router;

function creareventooperaciones(req, res, next) {
    formdataOperacionesService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function crearproduccion(req, res, next) {
    formdataOperacionesService.createproduction(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function recuperarregistrosall(req, res, next) {
    formdataOperacionesService.recuperarRegistrosAll()
        .then(registrosall => res.json(registrosall))
        .catch(err => next(err));
}

function modificareventooperaciones(req, res, next) {
    console.log(req.body);
    formdataOperacionesService.modify(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

///////////////////////////
