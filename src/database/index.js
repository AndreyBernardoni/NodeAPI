// Definindo o Mongoose
const mongoose = require('mongoose');

// Criando a conexão com o MongoDB e definindo o MongoClient
mongoose.connect('mongodb://localhost/nodeapi');
mongoose.Promise = global.Promise;

// Exportando o Banco de dados
module.exports = mongoose;