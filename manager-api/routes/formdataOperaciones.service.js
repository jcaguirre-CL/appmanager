const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const FormdataOperaciones = db.FormdataOperaciones;

module.exports = {
    create
};

async function create(formdataParam) {

    const formdataoperaciones = new FormdataOperaciones(formdataParam);

    await formdataoperaciones.save();
}