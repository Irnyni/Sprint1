const Comment = require('../../database/model/commentModel'); // Importa o modelo de comentários

function getAllCommentsForPost(req, res) {
  const postId = req.params.postId;

  Comment.find({ postId }) // Encontra todos os comentários associados a um post específico
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

module.exports = { getAllCommentsForPost, createCommentForPost };
