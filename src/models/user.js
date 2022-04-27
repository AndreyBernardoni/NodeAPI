// Denifindo o Mongoose
const mongoose = require('../database');
// Definindo o Bcrypt
const bcrypt = require('bcryptjs');

// Criando um Schema para o MongoDB
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Criptfografando a senha
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Definindo o Schema do User 
const User = mongoose.model('User', UserSchema);

// Exportando o User
module.exports = User;