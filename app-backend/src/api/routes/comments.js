// routes.js

const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// Rota para buscar todos os comentários para uma postagem específica
router.get('/', commentsController.getCommentsForPost);

// Rota para criar um novo comentário para uma postagem específica
router.post('/comments', commentsController.createCommentForPost);

// Adicione outras rotas conforme necessário

module.exports = router;
