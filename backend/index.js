import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
  res.send(`Server is running on PORT ${PORT}`);
})

app.get('/news', async (req, res) => {
  const { country, category, pageSize, page } = req.query;
  const apiKey = '0c6978c3826740158dab336b6eff91d9';

  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
