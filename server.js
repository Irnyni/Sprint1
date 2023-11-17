
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRouter = require('./app-backend/src/api/routes/posts');
const usersRouter = require('./app-backend/src/api/routes/users');
const app = express();
const PORT = process.env.PORT || 5000;
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
app.use('/users', usersRouter); 
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