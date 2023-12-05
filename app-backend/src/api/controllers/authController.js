const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../database/model/userModel');
const bodyParser = require('body-parser');

async function login(req, res) {
    const { email, password } = req.body;
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const user = await User.findOne({ email });
        console.log(email);
        if (!user) {
            return res.status(401).json({ error: 'Nome de usuário ou senha incorretos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Nome de usuário ou senha incorretos' });
        }

        const token = jwt.sign({ userId: user.id, name: user.email }, 'seu_segredo_super_secreto');

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    login,
};