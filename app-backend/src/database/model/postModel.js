const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
  },
  postagem: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;














// const app = require('../../../../server');

// const posts = [
//   {
//     descricao: "Matrix Resurrections",
//     postagem: "Assisti ao filme 'Matrix Resurrections' e fiquei impressionado com os efeitos especiais e a história intrigante. Keanu Reeves entrega uma atuação incrível como Neo.",
//     imagem: "https://ogimg.infoglobo.com.br/rioshow/24118715-847-afa/FT1086A/760/matrix.jpg",
//   },
//   {
//     descricao: "Duna",
//     postagem: "Ontem à noite, assisti ao épico 'Duna'. A fotografia é deslumbrante e a trama é cativante. Ansioso pela sequência!",
//     imagem: "https://olhardigital.com.br/wp-content/uploads/2021/05/Elenco-de-Duna-tem-scaled.jpg",
//   },
//   {
//     descricao: "No Time to Die",
//     postagem: "O último filme de James Bond, 'No Time to Die', é uma montanha-russa de ação e emoção. Daniel Craig encerra sua jornada como Bond de maneira espetacular.",
//     imagem: "https://static.mediapart.fr/etmagine/article_google_discover/files/2022/01/27/no-time-to-die-mgm-sets-pvod-release-date-for-daniel-craigs-final-bond-film.jpg",
//   },
//   {
//     descricao: "Spider-Man: No Way Home",
//     postagem: "Assisti ao filme 'Spider-Man: No Way Home' e fiquei maravilhado com o multiverso do Homem-Aranha. Uma explosão de nostalgia para os fãs!",
//     imagem: "https://gkpb.com.br/wp-content/uploads/2022/06/fagWFrNEGrM2p3DCOwgrO5fBmUn-scaled-e1655148584687.jpg",
//   },
//   {
//     descricao: "Inception",
//     postagem: "Reassisti 'Inception' de Christopher Nolan. A complexa trama dos sonhos ainda me fascina, e a atuação de Leonardo DiCaprio é incrível.",
//     imagem: "https://frontmediaspot.com/wp-content/uploads/2023/07/Inception-3.jpg",
//   },
// ];



// function getAllPosts() {
//   return posts;
// }

// function createPost(descricao, postagem, imagem) {
//   const newPost = { descricao, postagem, imagem };
//   posts.push(newPost);
//   return newPost;
// }

// module.exports = { getAllPosts, createPost };