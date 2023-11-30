const Post = require('../../database/model/postModel');

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts', details: error.message });
  }
}

async function createPost(req, res) {
  try {
    const { descricao, postagem, imagem } = req.body;
    const newPost = new Post({ descricao, postagem, imagem });
    const post = await newPost.save();
    res.status(201).json({ message: 'Item criado com sucesso', post });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar post', details: error.message });
  }
}

async function deletePost(req, res) {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Postagem não encontrada' });
    }
    res.json({ message: 'Postagem excluída com sucesso', deletedPost });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir postagem', details: error.message });
  }
}

module.exports = { getAllPosts, createPost, deletePost };
