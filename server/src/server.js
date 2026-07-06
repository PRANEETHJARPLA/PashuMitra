require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const animalRoutes = require('./routes/animalRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('PashuMitra API is running');
});

app.use('/api/animals', animalRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
