const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const FormdataOperaciones = db.FormdataOperaciones;

module.exports = {
    create,
    recuperarRegistrosAll
};

async function create(formdataParam) {
    const formdataoperaciones = new FormdataOperaciones(formdataParam);
    await formdataoperaciones.save();
}

async function recuperarRegistrosAll() {
    console.log('testing');
    return await FormdataOperaciones.find().select('-hash');
}

