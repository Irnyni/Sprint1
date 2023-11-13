const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.post('/posts', postsController.createPost);
router.get('/posts', postsController.getAllPosts);

module.exports = router;