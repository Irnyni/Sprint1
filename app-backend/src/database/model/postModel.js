// postModel.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  descricao: String,
  postagem: String,
  imagem: String,
  comments: [
    {
      commenterName: String,
      commentText: String,
    },
  ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
