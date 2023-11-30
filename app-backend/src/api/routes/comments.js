const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

// Rota para obter todos os comentários para um post
router.get('/posts/:postId', commentsController.getAllCommentsForPost);
router.get('/', commentsController.getAllCommentsForPost);
// Rota para criar um novo comentário para um post
router.post('/:postId', commentsController.createCommentForPost);

module.exports = router;
