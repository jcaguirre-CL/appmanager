const express = require('express');
const router = express.Router();
const formdataOperacionesService = require('./formdataOperaciones.service');

// routes
router.post('/crearEventoOperaciones', creareventooperaciones);
router.get('/recuperarRegistrosAll', recuperarregistrosall);

module.exports = router;

function creareventooperaciones(req, res, next) {
    formdataOperacionesService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function recuperarregistrosall(req, res, next) {
    formdataOperacionesService.recuperarRegistrosAll()
        .then(registrosall => res.json(registrosall))
        .catch(err => next(err));
}

///////////////////////////
