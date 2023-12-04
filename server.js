const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const postsRouter = require('./app-backend/src/api/routes/posts');
const usersRouter = require('./app-backend/src/api/routes/users');
const commentsRouter = require('./app-backend/src/api/routes/comments');
const authRouter = require('./app-backend/src/api/routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
mongoose.connect('mongodb+srv://irnyni:123@banco1.wurjpjq.mongodb.net/b1');
app.use(bodyParser.json());
const secretKey = 'seu_segredo_super_secreto';

// Importe o modelo User
const User = require('./app-backend/src/database/model/userModel');

// Middleware para verificação do token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log(token);
  console.log(!token.startsWith('Bearer '));
  if (!token || !token.startsWith('Bearer ')) {
    console.error('Token não fornecido ou no formato incorreto');
    return res.status(401).json({ error: 'Token não fornecido ou no formato incorreto' });
  }
  
  console.log('Antes da verificação do token');
const decoded = jwt.verify(token, secretKey);
console.log('Após a verificação do token', decoded);


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
app.use('/posts', postsRouter);
app.use('/users',usersRouter);
app.use('/comments', commentsRouter);
app.use('/login', authRouter)
//verifyToken,

// Verificar a conexão
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', function () {
  console.log('Conectado ao MongoDB com sucesso');
});

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor Express está rodando na porta ${PORT}`);
});

module.exports = app;






























// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const postsRouter = require('./app-backend/src/api/routes/posts');
// const usersRouter = require('./app-backend/src/api/routes/users');
// const commentsRouter = require('./app-backend/src/api/routes/comments');

// const app = express();
// const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb+srv://irnyni:123@banco1.wurjpjq.mongodb.net/b1');


// const secretKey = 'seu_segredo_super_secreto';

// // Importe o modelo User
// const User = require('./app-backend/src/database/model/userModel');

// // Lógica de autenticação
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Simulação de busca no banco de dados para encontrar o usuário
//     const existingUser = await User.findOne({ email, password });

//     if (existingUser) {
//       // Credenciais válidas, criar token JWT
//       const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, secretKey, { expiresIn: '1h' });

//       res.json({ token });
//     } else {
//       // Credenciais inválidas
//       res.status(401).json({ error: 'Credenciais inválidas' });
//     }
//   } catch (error) {
//     console.error('Erro ao autenticar usuário:', error);
//     res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// });

// // Verificar a conexão
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
// db.once('open', function () {
//   console.log('Conectado ao MongoDB com sucesso');
// });

// app.use(bodyParser.json());
// app.use(cors());

// app.use('/posts', postsRouter);
// app.use('/users', usersRouter); 
// app.use('/comments', commentsRouter);

// app.listen(PORT, () => {
//   console.log(`Servidor Express está rodando na porta ${PORT}`);
// });

// module.exports = app;
