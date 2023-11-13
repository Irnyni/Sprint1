const postsRouter = require('./app-backend/src/api/routes/posts');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe o módulo cors
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());




app.use(bodyParser.json());
app.use(cors());

app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express está rodando na porta ${PORT}`);
});

module.exports = app;