// Importando o express, router e Middlewares
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

// Rota de Get da API
router.get('/', (req, res) => {
    res.send({
        message: 'Hello World',
        user: req.userId,
    });
});

// Exportando o Router
module.exports = app => app.use('/projects', router);