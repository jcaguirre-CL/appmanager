const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const FormdataOperaciones = db.FormdataOperaciones;
const FormdataProducciones = db.FormdataProducciones;

const nodemailer = require("nodemailer");

const path = require("path");

var ejs = require('ejs');
var fs = require('fs');
// var templateString = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correo.ejs', 'utf-8');
var templateString = fs.readFileSync(path.resolve(__dirname,'./templates/correo.ejs'), 'utf-8');

/* const sendEmail = require('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/transport.js');
var templateString1Evento = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correo1evento.ejs', 'utf-8');
 */
module.exports = {
    create,
    modify,
    createproduction,
    recuperarRegistrosAll
};

async function create(formdataParam) {
    const formdataoperaciones = new FormdataOperaciones(formdataParam);
/*     if(true){
      throw 'Error en el formulario';
    } */
    (async () => {

        result = await formdataoperaciones.save();

        if (result.detalleeventoOperaciones.camaraCamara == 'MAL' ||
        result.detalleeventoOperaciones.camaraPluma == 'MAL' ||
        result.detalleeventoOperaciones.camaraSteady == 'MAL' ||
        result.detalleeventoOperaciones.camaraRiel == 'MAL' ||
        result.detalleeventoOperaciones.camaraDron == 'MAL' ||
        result.detalleeventoOperaciones.camaraPersonal == 'MAL' ||
        result.detalleeventoOperaciones.videoComunicaciones == 'MAL' ||
        result.detalleeventoOperaciones.videoPantallas == 'MAL' ||
        result.detalleeventoOperaciones.videoSwitch == 'MAL' ||
        result.detalleeventoOperaciones.videoPersonal == 'MAL' ||
        result.detalleeventoOperaciones.playRecurso == 'MAL' ||
        result.detalleeventoOperaciones.playContenido == 'MAL' ||
        result.detalleeventoOperaciones.playPersonal == 'MAL' ||
        result.detalleeventoOperaciones.graficaRecurso == 'MAL' ||
        result.detalleeventoOperaciones.graficaContenido == 'MAL' ||
        result.detalleeventoOperaciones.graficaPersonal == 'MAL' ||
        result.detalleeventoOperaciones.audioRecurso == 'MAL' ||
        result.detalleeventoOperaciones.audioPersonal == 'MAL' ||
        result.detalleeventoOperaciones.iluminacionRecurso == 'MAL' ||
        result.detalleeventoOperaciones.iluminacionPersonal == 'MAL' ||
        result.detalleeventoOperaciones.transporteEnlaceServicio == 'MAL' ||
        result.detalleeventoOperaciones.energiaServicio == 'MAL' ||
        result.detalleeventoOperaciones.acServicio == 'MAL' ||
        result.detalleeventoOperaciones.maquillajeServicio == 'MAL' ||
        result.detalleeventoOperaciones.utileriaServicio == 'MAL' ||
        result.detalleeventoOperaciones.tramoyaServicio == 'MAL' ||
        result.detalleeventoOperaciones.supervisorServicio == 'MAL') {
          result.detalleeventoOperaciones.errorArea = 'SI'
          await FormdataOperaciones
          .findByIdAndUpdate(result._id,{ $set: {detalleeventoOperaciones: result.detalleeventoOperaciones,
                                                id: result._id}});
        } else {
          result.detalleeventoOperaciones.errorArea = 'NO'
          await FormdataOperaciones
          .findByIdAndUpdate(result._id,{ $set: {detalleeventoOperaciones: result.detalleeventoOperaciones,
                                                id: result._id}});
        }

    })();

    fecha = formdataParam.detalleeventoOperaciones.fechaEvento.
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '')
    message = ejs.render(templateString, {
        result: 'test',
        remitente: 'soportebitc13@gmail.cl',
        fecha: fecha,
        datos: formdataParam
    });
    console.log(formdataParam.detalleeventoOperaciones.produccion.areaProduccion);
    const produccion = await FormdataProducciones.findOne({ areaProduccion : formdataParam.detalleeventoOperaciones.produccion.areaProduccion });
    // recuperarCorreosProduccion(formdataParam.detalleeventoOperaciones.produccion.areaProduccion);
    console.log(produccion.listacorreoProduccion);
    enviarcorreo(message, produccion.listacorreoProduccion);
}

async function createproduction(formdataParam) {
  const formdataproducciones = new FormdataProducciones(formdataParam);
  await formdataproducciones.save();
  try {
      // const obj = JSON.parse(formdataParam);
      console.log(formdataParam);
    } catch(err) {
      console.error(err)
    }
}

async function recuperarRegistrosAll() {
    console.log('testing');
    return await FormdataOperaciones.find().select('-hash');
}

async function recuperarCorreosProduccion(areaprod) {
  return await FormdataProducciones.findOne({areaProduccion: areaprod}, 'listacorreoProduccion',);
}

async function modify(result) {
  console.log('id',result.id);
  // result.detalleeventoOperaciones.confirmaProd = 'SI';
  const formdataoperaciones = await FormdataOperaciones
    // .findByIdAndUpdate(result.id,{detalleeventoOperaciones: {obsEventoProduccion: result.detalleeventoOperaciones.obsEventoProduccion}},);
    .findByIdAndUpdate(result.id,{detalleeventoOperaciones: result.detalleeventoOperaciones},);
    // .update({_id: result.id}, {$set: {detalleeventoOperaciones: {obsEventoProduccion: result.detalleeventoOperaciones.obsEventoProduccion}}});
    console.log('modify',formdataoperaciones);
  }

async function enviarcorreo(message, lista) {
  // async function enviarcorreo(message, listacorreoProduccion) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    // console.log(listacorreoProduccion);
    let transporter = nodemailer.createTransport({
/*       host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports */
      service: 'gmail',
      auth: {
        // user: testAccount.user, // generated ethereal user
        user: 'soportebitc13@gmail.com', // generated ethereal user
        // pass: testAccount.pass // generated ethereal password
        pass: 'ingeadmin' // generated ethereal password
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Equipo Soporte BIT" <soportebitc13@gmail.com>', // sender address
      to: lista, // list of receivers
      // to: "jcaguirre@13.cl", // list of receivers
      subject: "INFORME: REGISTRO OPERACIONES 13", // Subject line
      // text: "Hello world?", // plain text body
      html: message // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }