// Importando o nodemailer, path,mailConfig e hbs
const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail.json');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Importando o transporter
var transport = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
    }
});

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}));

// Exportando o transporter
module.exports = transport;