const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// טיפול בבקשות ל-favicon.ico כדי למנוע שגיאת 404
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', async (req, res) => {
  console.log("Received request to /");

  const apiKey = process.env.RENDER_API_KEY;
  if (!apiKey) {
    console.error(" Missing RENDER_API_KEY in .env file!");
    return res.status(500).json({ message: "Server configuration error: Missing API key" });
  }

  try {
    const response = await axios.get('https://api.render.com/v1/services', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(' Error fetching data from Render API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
