document.addEventListener('DOMContentLoaded', function() {
    // Código para a página de login
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('userId', data.userId);
                    window.location.href = 'perfil.html';
                } else {
                    alert('Falha no login: ' + data.message);
                }
            });
        });
    }

    // Código para a página de perfil
    if (document.getElementById('logoutButton')) {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`/perfil/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('username').textContent = data.user.nome_usuario;
                        document.getElementById('email').textContent = data.user.email;
                    } else {
                        document.getElementById('user-info').style.display = 'none';
                        document.getElementById('not-logged-in').style.display = 'block';
                    }
                });
        } else {
            document.getElementById('user-info').style.display = 'none';
            document.getElementById('not-logged-in').style.display = 'block';
        }

        document.getElementById('logoutButton').addEventListener('click', function() {
            localStorage.removeItem('userId');
            window.location.href = 'index.html';
        });
    }

    // Código para animação de botão
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
const app = express();

app.post('/logout', (req, res) => {
    // Exemplo para destruir a sessão
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao deslogar');
        }
        res.clearCookie('connect.sid'); // ou qualquer outro cookie de sessão que esteja usando
        res.status(200).send('Logout bem-sucedido');
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});