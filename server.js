const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/code', async (req, res) => {
  const number = req.query.number;
  if (!number) {
    return res.status(400).json({ error: 'Number query parameter is required' });
  }

  try {
    const response = await axios.get(`https://knight-bot-paircode.onrender.com/code?number=${number}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching from original server:", error.message);
    res.status(500).json({ error: "Failed to fetch code from original server" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Proxy server running at http://localhost:${port}`);
});
