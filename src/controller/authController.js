// Definindo o Express, BCrypt e JWT 
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importando o AuthConfig
const authConfig = require('../config/auth');

// Definindo o User
const User = require('../models/User');

// Definindo o Router
const router = express.Router();

// Função para gerar o token
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

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
        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
        // Tratamento de Erro
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

// Rota de Autenticação
router.post('/authenticate', async(req, res) => {
    // Recebendo o email e a senha
    const { email, password } = req.body;
    // Verificando se o email existe
    const user = await User.findOne({ email }).select('+password');

    // Verificando se o usuario existe
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }
    // Verificando se a senha está correta
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }
    // Removendo a senha do usuario
    user.password = undefined;

    // Retornando o usuario
    res.send({
        user,
        token: generateToken({ id: user.id }),
    });
});

// Toda vez que for acessado o /auth, será chamado o router
module.exports = app => app.use('/auth', router);