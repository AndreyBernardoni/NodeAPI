// Definindo o Express e o App
const express = require('express');
const app = express();

// Definindo o Express para usar o Body Parser
app.use(express.json());
// Decoder para o Body Parser
app.use(express.urlencoded({ extended: false }));

// Definindo os Controllers no app
require('./controller/index')(app);

// Iniciando o servidor
app.listen(3000);