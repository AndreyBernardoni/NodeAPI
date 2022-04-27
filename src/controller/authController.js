// Definindo o Express
const express = require('express');

// Definindo o User
const User = require('../models/User');

// Definindo o Router
const router = express.Router();

// Metodo de Post da API
router.post('/register', async(req, res) => {
    try {
        // Validando o email
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        // Recebendo os dados do usuário
        const user = await User.create(req.body);
        // Tornando a password undefined
        user.password = undefined;
        // Retornando o usuário
        return res.send({ user });
        // Tratamento de Erro
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

// Toda vez que for acessado o /auth, será chamado o router
module.exports = app => app.use('/auth', router);