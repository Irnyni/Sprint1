// commentsController.js no lado do servidor

const Comment = require('../../database/model/commentModel'); // Importe o modelo adequado se necessário

const getAllCommentsForPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    console.error('Erro ao buscar os comentários para o post:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const createCommentForPost = async (req, res) => {
  const postId = req.params.postId;
  const { commenterName, commentText } = req.body;

  try {
    // Crie um novo comentário usando o modelo Comment e os dados fornecidos
    const newComment = new Comment({
      postId,
      commenterName,
      commentText,
    });

    // Salve o novo comentário no banco de dados
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Erro ao criar um novo comentário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Outros métodos do controlador conforme necessário

module.exports = {
  getAllCommentsForPost,
  createCommentForPost,
  // Outros métodos exportados
};
