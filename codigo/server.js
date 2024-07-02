const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'pages/cadastro/db.json'));
const middlewares = jsonServer.defaults();

// Configura o JSON Server
app.use('/api', middlewares, router);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'pages')));

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

// Iniciar o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
