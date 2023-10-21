const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o módulo cors
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // Permita solicitações apenas de http://localhost:3000
//   }));
  
// Vamos criar um array simples para simular o armazenamento de objetos


const posts = [
    {
      descricao: "Matrix Resurrections",
      postagem: "Assisti ao filme 'Matrix Resurrections' e fiquei impressionado com os efeitos especiais e a história intrigante. Keanu Reeves entrega uma atuação incrível como Neo.",
      imagem: "https://ogimg.infoglobo.com.br/rioshow/24118715-847-afa/FT1086A/760/matrix.jpg",
    },
    {
      descricao: "Duna",
      postagem: "Ontem à noite, assisti ao épico 'Duna'. A fotografia é deslumbrante e a trama é cativante. Ansioso pela sequência!",
      imagem: "https://olhardigital.com.br/wp-content/uploads/2021/05/Elenco-de-Duna-tem-scaled.jpg",
    },
    {
      descricao: "No Time to Die",
      postagem: "O último filme de James Bond, 'No Time to Die', é uma montanha-russa de ação e emoção. Daniel Craig encerra sua jornada como Bond de maneira espetacular.",
      imagem: "https://static.mediapart.fr/etmagine/article_google_discover/files/2022/01/27/no-time-to-die-mgm-sets-pvod-release-date-for-daniel-craigs-final-bond-film.jpg",
    },
    {
      descricao: "Spider-Man: No Way Home",
      postagem: "Assisti ao filme 'Spider-Man: No Way Home' e fiquei maravilhado com o multiverso do Homem-Aranha. Uma explosão de nostalgia para os fãs!",
      imagem: "https://gkpb.com.br/wp-content/uploads/2022/06/fagWFrNEGrM2p3DCOwgrO5fBmUn-scaled-e1655148584687.jpg",
    },
    {
      descricao: "Inception",
      postagem: "Reassisti 'Inception' de Christopher Nolan. A complexa trama dos sonhos ainda me fascina, e a atuação de Leonardo DiCaprio é incrível.",
      imagem: "https://frontmediaspot.com/wp-content/uploads/2023/07/Inception-3.jpg",
    },
  ];
  

  app.post('/', (req, res) => {
    const { descricao, postagem, imagem } = req.body;
    const novoItem = { descricao, postagem, imagem };
    posts.push(novoItem); // Use 'posts' em vez de 'items'

    // Envie uma resposta para o cliente
    res.status(201).json({ message: 'Item criado com sucesso' });
});


// Rota para listar todos os objetos
app.get('/', (req, res) => {
    res.json(posts);
});

// Rota para obter detalhes de um objeto por ID
// app.get('/objetos/:objetoId', (req, res) => {
//     const objetoId = req.params.objetoId;
//     if (objetoId >= 0 && objetoId < objetos.length) {
//         res.json(objetos[objetoId]);
//     } else {
//         res.status(404).json({ mensagem: 'Objeto não encontrado' });
//     }
// });

// // Rota para atualizar os detalhes de um objeto por ID
// app.put('/objetos/:objetoId', (req, res) => {
//     const objetoId = req.params.objetoId;
//     if (objetoId >= 0 && objetoId < objetos.length) {
//         const { descricao, postagem, imagem } = req.body;
//         objetos[objetoId].descricao = descricao;
//         objetos[objetoId].postagem = postagem;
//         objetos[objetoId].imagem = imagem;
//         res.json({ mensagem: 'Objeto atualizado com sucesso' });
//     } else {
//         res.status(404).json({ mensagem: 'Objeto não encontrado' });
//     }
// });

// Rota para excluir um objeto por ID
// app.delete('/objetos/:objetoId', (req, res) => {
//     const objetoId = req.params.objetoId;
//     if (objetoId >= 0 && objetoId < objetos.length) {
//         objetos.splice(objetoId, 1);
//         res.json({ mensagem: 'Objeto excluído com sucesso' });
//     } else {
//         res.status(404).json({ mensagem: 'Objeto não encontrado' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Servidor Express está rodando na porta ${PORT}`);
  });