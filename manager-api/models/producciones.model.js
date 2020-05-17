const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    areaProduccion: { type: String, required: true },
    responsableProduccion: { type: String, required: true },
    pgmsProduccion: { type: [String], required: true },
    listacorreoProduccion: { type: [String], required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Producciones', schema);