const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/pix', async (req, res) => {
  try {
    const response = await axios.post('https://api.pixup.com.br/api/v1/cobranca', {
      valor: 10.00,
      descricao: 'Pagamento Cred Amigo',
      vencimento: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.PIXUP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      qrCode: response.data.qr_code,
      copiaCola: response.data.copia_cola
    });
  } catch (error) {
    console.error('Erro ao gerar cobrança:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro ao gerar cobrança' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
