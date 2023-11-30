const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');


router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.delete('/:id', postsController.deletePost);


module.exports = router;
