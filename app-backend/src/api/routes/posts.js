const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const Post = require('../../database/model/postModel'); // Caminho correto para o modelo

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);

module.exports = router;

