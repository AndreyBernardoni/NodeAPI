// Definindo o Express e o App
const express = require('express');
const app = express();

// Definindo o Express para usar o Body Parser
app.use(express.json());
// Decoder para o Body Parser
app.use(express.urlencoded({ extended: false }));



// Definindo o o authController no app
require('./controller/authController')(app);
// Definindo o o projectController no app
require('./controller/projectController')(app);

// Iniciando o servidor
app.listen(3000);