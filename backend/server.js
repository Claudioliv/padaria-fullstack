const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; // O servidor vai rodar nessa porta

// Middleware 
app.use(cors());
app.use(express.json());

// Rota de teste 
app.get('/api/teste', (req, res) => {
    res.json({msg: 'Backend conectado com sucesso!'});
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando lindamente na porta ${PORT}`);
})