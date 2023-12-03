const User = require('../../database/model/userModel'); 
const bcrypt = require('bcrypt');

function getAllUsers(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: 'Erro ao buscar usuários', details: error }));
}

async function createUser(req, res) {
  const { name, email, birthdate, password } = req.body;

  try {
    // Hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, birthdate, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error });
  }
}

module.exports = { createUser, getAllUsers };

