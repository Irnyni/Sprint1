const postsModel = require('../../database/model/postModel');

function getAllPosts(req, res) {
  const posts = postsModel.getAllPosts();
  res.json(posts);
}

function createPost(req, res) {
  const { descricao, postagem, imagem } = req.body;
  const newPost = postsModel.createPost(descricao, postagem, imagem);
  res.status(201).json({ message: 'Item criado com sucesso', post: newPost });
  }

module.exports = { getAllPosts, createPost };