const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');


const app = express();
const port = 3001;
app.use(cors());

app.get('/scrape', async (req, res) => {
    
  try {
    const param1 = req.query.param1;

    const url = param1;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    var text = $('body').text();
const finaltext = text.replace(/<[^>]*>/g, '');

    res.json({ finaltext });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the URL' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});