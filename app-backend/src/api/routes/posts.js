const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const jwt = require('jsonwebtoken');
const secretKey = 'seu_segredo_super_secreto';
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
console.log('Token recebido:', token);

if (!token || !token.startsWith('Bearer ')) {
  console.error('Token não fornecido ou no formato incorreto');
  return res.status(401).json({ error: 'Token não fornecido ou no formato incorreto' });
}

  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(token);
      console.error('Erro na verificação do token:', error);
      res.status(401).json({ error: 'Token inválido' });
    }
  };

router.post('/', postsController.createPost);
router.get('/', postsController.getAllPosts);
router.delete('/:id', postsController.deletePost);


module.exports = router;
