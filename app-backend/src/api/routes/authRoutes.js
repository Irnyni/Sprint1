const express = require('express');
const authController = require('../controllers/authController');  // Importe o controlador de autenticação

const router = express.Router();

// Rota para login
router.post('/', authController.login);

module.exports = router;