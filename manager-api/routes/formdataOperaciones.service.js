﻿const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const FormdataOperaciones = db.FormdataOperaciones;

const nodemailer = require("nodemailer");

var ejs = require('ejs');
var fs = require('fs');
var templateString = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correo.ejs', 'utf-8');

/* const sendEmail = require('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/transport.js');
var templateString1Evento = fs.readFileSync('/run/media/machine/DATA/06 DEVELOPMENT/NodeJS/appManager/manager-api/routes/templates/correo1evento.ejs', 'utf-8');
 */
module.exports = {
    create,
    recuperarRegistrosAll
};

async function create(formdataParam) {
    const formdataoperaciones = new FormdataOperaciones(formdataParam);
    await formdataoperaciones.save();
    console.log(formdataParam);
    try {
        // const obj = JSON.parse(formdataParam);
        console.log(formdataParam.incidentes);
      } catch(err) {
        console.error(err)
      }
    fecha = formdataParam.detalleeventoOperaciones.fechaEvento.
      replace(/T/, ' ').      // replace T with a space
      replace(/\..+/, '')
    message = ejs.render(templateString, {
        result: 'test',
        remitente: 'soportebitc13@gmail.cl',
        fecha: fecha,
        datos: formdataParam
    });

    enviarcorreo(message).catch(console.error);
}

async function recuperarRegistrosAll() {
    console.log('testing');
    return await FormdataOperaciones.find().select('-hash');
}

async function enviarcorreo(message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
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
      to: "jcaguirre@13.cl", // list of receivers
      subject: "INFORME: REGISTRO OPERACIONES 13", // Subject line
      text: "Hello world?", // plain text body
      html: message // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }