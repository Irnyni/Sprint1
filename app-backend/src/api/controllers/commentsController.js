// commentsController.js

const Comment = require('../../database/model/commentModel');

function getAllCommentsForPost(req, res) {
  const postId = req.params.postId;

  Comment.find({ postId })
    .then(comments => res.json(comments))
    .catch(error => res.status(500).json({ error: 'Erro ao buscar comentários', details: error }));
}

function createCommentForPost(req, res) {
  const postId = req.params.postId;
  const { commenterName, commentText } = req.body;

  const newComment = new Comment({
    postId,
    commenterName,
    commentText,
  });

  newComment.save()
    .then(comment => res.status(201).json({ message: 'Comentário adicionado com sucesso', comment }))
    .catch(error => res.status(500).json({ error: 'Erro ao criar comentário', details: error }));
}

// Adicione a função para buscar comentários de uma postagem específica
function getCommentsForPost(req, res) {
  const postId = req.params.postId;

  Comment.find({ postId })
    .then(comments => res.json(comments))
    .catch(error => res.status(500).json({ error: 'Erro ao buscar comentários para a postagem', details: error }));
}

module.exports = { getAllCommentsForPost, createCommentForPost, getCommentsForPost };
