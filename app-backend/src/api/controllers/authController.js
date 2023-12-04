const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../database/model/userModel');

const secretKey = 'seu_segredo_super_secreto';

// Função para lidar com o login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Encontre o usuário pelo nome de usuário (ou email)
    const user = await User.findOne({ email });

    console.log('User:', user);  // Adicione esta linha para depuração

    if (!user) {
      console.log('Credenciais inválidas: Usuário não encontrado');  // Adicione esta linha para depuração
      return res.status(401).send('Credenciais inválidas');
    }

    // Verifique a senha usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Credenciais inválidas: Senha incorreta');  // Adicione esta linha para depuração
      return res.status(401).send('Credenciais inválidas');
    }

    // Se a senha estiver correta, gere um token JWT e envie para o cliente
    const token = jwt.sign({ userId: user.id, name: user.name }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login bem-sucedido' });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro ao fazer login');
  }
}

module.exports = {
  login,
};
