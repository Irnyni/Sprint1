const Post = require('../../database/model/postModel'); 

function getAllPosts(req, res) {
  Post.find()
    .then(posts => res.json(posts))
    .catch(error => res.status(500).json({ error: 'Erro ao buscar posts', details: error }));
}

function createPost(req, res) {
  const { descricao, postagem, imagem } = req.body;

  const newPost = new Post({ descricao, postagem, imagem });

  newPost.save()
    .then(post => res.status(201).json({ message: 'Item criado com sucesso', post }))
    .catch(error => res.status(500).json({ error: 'Erro ao criar post', details: error }));
}

module.exports = { getAllPosts, createPost };




























// const postsModel = require('../../database/model/postModel');

// function getAllPosts(req, res) {
//   const posts = postsModel.getAllPosts();
//   res.json(posts);
// }

// function createPost(req, res) {
//   const { descricao, postagem, imagem } = req.body;
//   const newPost = postsModel.createPost(descricao, postagem, imagem);
//   res.status(201).json({ message: 'Item criado com sucesso', post: newPost });
//   }

// module.exports = { getAllPosts, createPost };


