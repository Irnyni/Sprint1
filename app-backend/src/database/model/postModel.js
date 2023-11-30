
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commenterName: String,
  commentText: String,
});

const postSchema = new mongoose.Schema({
  descricao: String,
  postagem: String,
  imagem: String,
  comments: [commentSchema], // Agora, a lista de comentários é composta por objetos do tipo commentSchema
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

































// // postModel.js

// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   descricao: String,
//   postagem: String,
//   imagem: String,
//   comments: [
//     {
//       commenterName: String,
//       commentText: String,
//     },
//   ],
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;
