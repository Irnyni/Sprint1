const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const mongoose = require('mongoose');
router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);

const postSchema = new mongoose.Schema({
    descricao: String,
    postagem: String,
    imagem: String,
  });
const Post = mongoose.model('Post', postSchema);
module.exports = router,Post;
