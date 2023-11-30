

const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Rota para criar um novo comentário
router.post('/', commentsController.createCommentForPost);

// Rota para obter todos os comentários para um post
router.get('/', commentsController.getAllCommentsForPost);

module.exports = router;
