// Definindo o Express e o App
const express = require('express');
const app = express();

// Definindo o Express para usar o Body Parser
app.use(express.json());
// Decoder para o Body Parser
app.use(express.urlencoded({ extended: false }));

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Definindo o o authController no app
require('./controller/authController')(app);

// Recebendo a requisição
app.get('/', (req, res) => {
    res.send('Hello World!');
});