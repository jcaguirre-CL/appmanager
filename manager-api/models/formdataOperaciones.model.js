const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetalleItemSchema = new Schema({
    name: { type: String, required: true },
    selected: { type: Boolean, required: true }
});
/* area: nivelfalla (menor, etc)
detalle: tipodefalla */
const IncidenteSchema = new Schema({
    area: { type: String, required: false },
    detalles: [String], 
    descripcion: { type: String, required: false },
    observacion: { type: String, required: false },
    impacto: { type: String, required: false }, 
    motivo: { type: String, required: false },
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
    id: { type: String, required: false },
    detalleeventoOperaciones: {
        fechaEvento: { type: Date, default: Date.now },
        horaProgIni: { type: String, required: true },
        horaProgFin: { type: String, required: true },
        horaRealIni: { type: String, required: true },
        horaRealFin: { type: String, required: true },
        atrasoIni: { type: String, required: true },
        atrasoFin: { type: String, required: true },
        responsableEvento: { type: String, required: true },
        switchEvento: { type: String, required: true },
        locacionEvento: { type: String, required: true },
        tipoOperacion: { type: String, required: true },
        tipoLocacion: { type: String, required: true },
        atencionEvento: { type: String, required: true },
        obsEvento: { type: String, required: false },
        camaraCamara: { type: String, required: false },
        camaraPluma: { type: String, required: false },
        camaraSteady: { type: String, required: false },
        camaraRiel: { type: String, required: false },
        camaraDron: { type: String, required: false },
        camaraPersonal: { type: String, required: false },
        videoComunicaciones: { type: String, required: false },
        videoPantallas: { type: String, required: false },
        videoSwitch: { type: String, required: false },
        videoPersonal: { type: String, required: false },
        playRecurso: { type: String, required: false },
        playContenido: { type: String, required: false },
        playPersonal: { type: String, required: false },
        graficaRecurso: { type: String, required: false },
        graficaContenido: { type: String, required: false },
        graficaPersonal: { type: String, required: false },
        audioRecurso: { type: String, required: false },
        audioPersonal: { type: String, required: false },
        iluminacionRecurso: { type: String, required: false },
        iluminacionPersonal: { type: String, required: false },
        transporteEnlaceServicio: { type: String, required: false },
        energiaServicio: { type: String, required: false },
        acServicio: { type: String, required: false },
        maquillajeServicio: { type: String, required: false },
        utileriaServicio: { type: String, required: false },
        tramoyaServicio: { type: String, required: false },
        supervisorServicio: { type: String, required: false },
        confirmaProd: { type: String, required: false },
        obsEventoProduccion: { type: String, required: false },
        errorArea: { type: String, required: false },
        produccion: {
            areaProduccion: { type: String, required: true },
            responsableProduccion: { type: String, required: true },
            pgmProduccion: { type: String, required: true },
            tipopgmProduccion: { type: String, required: true }
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