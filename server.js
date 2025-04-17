const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.static('public'));

app.get('/gerar-pix', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.pixup.com.br/api/cob/gerar-pix',
      {
        valor: 36.90,
        vencimento: 15,
        descricao: 'Pagamento Cred Amigo',
        chave: 'gomes1551_5842553951'
      },
      {
        headers: {
          Authorization: 'Bearer 15833350cb95c397d6d0cf15057644abbb305b5546a7130005f8463caeaea3cf',
          'Content-Type': 'application/json'
        }
      }
    );

    const { qrCode, copiaCola } = response.data;
    res.json({ qrCode, copiaCola });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ erro: 'Erro ao gerar cobrança Pix' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
