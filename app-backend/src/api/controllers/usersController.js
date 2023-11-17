const User = require('../../database/model/userModel'); 
function getAllUsers(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: 'Erro ao buscar usuários', details: error }));
}

function createUser(req, res) {
  const { name, email, birthdate } = req.body;

  const newUser = new User({ name, email, birthdate });

  newUser.save()
    .then(user => res.status(201).json({ message: 'Usuário criado com sucesso', user }))
    .catch(error => res.status(500).json({ error: 'Erro ao criar usuário', details: error }));
}

module.exports = { createUser, getAllUsers };

