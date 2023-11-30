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
function deletePost(req, res) {
  const postId = req.params.id;

  Post.findByIdAndDelete(postId)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).json({ error: 'Postagem não encontrada' });
      }
      res.json({ message: 'Postagem excluída com sucesso', deletedPost });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erro ao excluir postagem', details: error });
    });
}
module.exports = { getAllPosts, createPost, deletePost };
