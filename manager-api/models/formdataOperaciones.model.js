const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetalleItemSchema = new Schema({
    name: { type: String, required: true },
    selected: { type: Boolean, required: true }
});
/* area: nivelfalla (menor, etc)
detalle: tipodefalla */
const IncidenteSchema = new Schema({
    area: { type: String, required: true },
    detalles: [String], 
    descripcion: { type: String, required: true },
    observacion: { type: String, required: false },
    impacto: { type: String, required: true }, 
    motivo: { type: String, required: true },
});

/* const ProduccionSchema = new Schema({
    areaProduccion: { type: String, required: true },
    responsableProduccion: { type: String, required: true },
    pgmProduccion: { type: String, required: true }
});

const DetalleEventoOperacionesSchema = new Schema({
    fechaEvento: { type: Date, default: Date.now },
    responsableEvento: { type: String, required: true },
    atencionEvento: { type: String, required: true },
    obsEvento: { type: String, required: true },
    produccion: {
        areaProduccion: { type: String, required: true },
        responsableProduccion: { type: String, required: true },
        pgmProduccion: { type: String, required: true }
     } 
}); */

const schema = new Schema({
    incidentes: [IncidenteSchema],
    detalleeventoOperaciones: {
        fechaEvento: { type: Date, default: Date.now },
        responsableEvento: { type: String, required: true },
        atencionEvento: { type: String, required: true },
        obsEvento: { type: String, required: true },
        produccion: {
            areaProduccion: { type: String, required: true },
            responsableProduccion: { type: String, required: true },
            pgmProduccion: { type: String, required: true }
         } 
     }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FormdataOperaciones', schema);

/* var ToySchema = new Schema({ name: String });
var ToyBoxSchema = new Schema({
  toys: [ToySchema],
  buffers: [Buffer],
  strings: [String],
  numbers: [Number]
});

var ToyBox = mongoose.model('ToyBox', ToyBoxSchema);


userSchema = new Schema({
    roles: [
        role: {type: Schema.Types.ObjectId, ref: 'Role' }
    ]
})

rolesSchema = new Schema({
  name: String,
  roleEntities: [
    {
      entity : {type: Schema.Types.ObjectId, ref: 'RoleEntity' },
      abilities : [{type: Schema.Types.ObjectId, ref: 'Ability' }]
    }
  ]
}

roleEntitiesSchema = new Schema({
  name: String
})

abilitiesSchema = new Schema({
  name: String
});

const userSchema = new mongoose.Schema({
    name: {
      first: String,
      last: { type: String, trim: true }
    },
    age: { type: Number, min: 0 }
  }); */