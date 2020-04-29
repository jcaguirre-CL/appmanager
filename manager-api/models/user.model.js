const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    hash: { type: String, required: true },
    usuario: { type: String, unique: true, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    perfil: { type: String, required: true },
    area: { type: String, required: true },
    correo: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);