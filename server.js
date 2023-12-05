const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const postsRouter = require('./app-backend/src/api/routes/posts');
const usersRouter = require('./app-backend/src/api/routes/users');
const commentsRouter = require('./app-backend/src/api/routes/comments');
const authRouter = require('./app-backend/src/api/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://irnyni:123@banco1.wurjpjq.mongodb.net/b1');



// Importe o modelo User
const User = require('./app-backend/src/database/model/userModel');

// Middleware para verificação do token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token || !token.startsWith('Bearer ')) {
    console.error('Token não fornecido ou no formato incorreto');
    return res.status(401).json({ error: 'Token não fornecido ou no formato incorreto' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(token);
    console.error('Erro na verificação do token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Rotas protegidas
app.use('/posts',  postsRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/login', authRouter);

// Verificar a conexão
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', function () {
  console.log('Conectado ao MongoDB com sucesso');
});

app.listen(PORT, () => {
  console.log(`Servidor Express está rodando na porta ${PORT}`);
});

module.exports = app;
