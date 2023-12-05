const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const jwt = require('jsonwebtoken');
const secretKey = 'seu_segredo_super_secreto';

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.delete('/:id', postsController.deletePost);


module.exports = router;
