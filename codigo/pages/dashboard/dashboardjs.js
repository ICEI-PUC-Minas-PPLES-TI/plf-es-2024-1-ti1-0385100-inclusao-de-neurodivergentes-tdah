document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            animateButton(button);
        });
    });

    function animateButton(button) {
        button.style.transition = 'background-color 0.3s, transform 0.3s';
        button.style.backgroundColor = '#fffff'; 
        button.style.transform = 'scale(1.1)';

        // Revert back to original state after 300ms
        setTimeout(function() {
            button.style.backgroundColor = '#fffff';
            button.style.transform = 'scale(1)';
        }, 300);
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Dados de login simulados
const logins = [
    { id: 1, nome_usuario: 'Arthur Pazzutti', senha: 'senha123', email: 'arthur.pazzutti@sga.pucminas.br' },
    { id: 2, nome_usuario: 'Arlindo Junior', senha: 'senha456', email: 'maria.souza@example.com' },
    { id: 3, nome_usuario: 'Joaquim Vilela', senha: 'senha789', email: 'carlos.pereira@example.com' },
    { id: 4, nome_usuario: 'Vinicius Sena', senha: 'senha100', email: 'carlos.pereira@example.com' },
    { id: 5, nome_usuario: 'Gabriel Lima', senha: 'senha200', email: 'carlos.pereira@example.com' },
];

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = logins.find(u => u.nome_usuario === username && u.senha === password);

    if (user) {
        res.json({ success: true, userId: user.id });
    } else {
        res.json({ success: false, message: 'Nome de usuário ou senha incorretos.' });
    }
});

app.get('/perfil/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = logins.find(u => u.id === userId);

    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Usuário não encontrado.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    if (userId) {
        fetch(`/perfil/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('username').textContent = data.user.nome_usuario;
                    document.getElementById('email').textContent = data.user.email;
                } else {
                    alert('Erro ao carregar perfil: ' + data.message);
                }
            });
    } else {
        alert('Usuário não logado.');
        window.location.href = 'index.html';
    }
});
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('userId');
    window.location.href = 'index.html';
});