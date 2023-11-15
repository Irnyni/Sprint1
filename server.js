
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./app-backend/src/api/routes/posts');
const app = express();
const PORT = process.env.PORT || 5000;
const Post = require('../Sprint1/app-backend/src/database/model/postModel');
// Conectar ao MongoDB
 mongoose.connect('mongodb+srv://irnyni:123@banco1.wurjpjq.mongodb.net/b1');



// Verificar a conexão
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', function () {
  console.log('Conectado ao MongoDB com sucesso');
});

app.use(bodyParser.json());
app.use(cors());


app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express está rodando na porta ${PORT}`);
});

module.exports = app;
















// const postsRouter = require('./app-backend/src/api/routes/posts');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Importe o módulo cors
// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(bodyParser.json());
// app.use(cors());






// app.use(bodyParser.json());
// app.use(cors());

// app.use('/posts', postsRouter);

// app.listen(PORT, () => {
//   console.log(`Servidor Express está rodando na porta ${PORT}`);
// });

// module.exports = app;