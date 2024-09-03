const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Use o middleware cors

app.post("/ia", async (req, res) => {
    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3.1",
            prompt: "Give a single name for a rpg fantasy monster, only one word, without repetitions.",
            stream: false,
        });
        const respData = response.data.response.toString();
        res.send(respData);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});