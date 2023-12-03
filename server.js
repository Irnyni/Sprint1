const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const postsRouter = require('./app-backend/src/api/routes/posts');
const usersRouter = require('./app-backend/src/api/routes/users');
const commentsRouter = require('./app-backend/src/api/routes/comments');
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

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Rotas protegidas
app.use('/posts', verifyToken, postsRouter);
app.use('/users',usersRouter);
app.use('/comments', verifyToken, commentsRouter);

// Rota para login
app.post('/users', async (req, res) => {
  console.log('Dados recebidos:', req.body);

  const { name, email, birthdate, password } = req.body;

  

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      birthdate,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).send('Usuário criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar um novo usuário:', error);
    res.status(500).send('Erro ao criar um novo usuário');
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Encontre o usuário pelo nome de usuário (ou email)
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send('Nome de usuário ou senha incorretos');
    }

    // Verifique a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Nome de usuário ou senha incorretos');
    }

    // Se a senha estiver correta, você pode gerar um token JWT aqui e enviar para o cliente
    // (Lembre-se de usar um pacote como 'jsonwebtoken' para isso)

    // Envie uma resposta adequada para o cliente
    res.status(200).send('Login bem-sucedido');
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro ao fazer login');
  }
});
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
