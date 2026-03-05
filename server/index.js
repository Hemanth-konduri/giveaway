require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://giveaway-mocha-rho.vercel.app',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('GiveWave API is running ✅');
});

if (process.env.DATABASE_URL) {
  const pool = require('./config/db');
  pool.query('SELECT NOW()', (err, result) => {
    if (err) console.log('DB Error:', err);
    else console.log('✅ DB Connected:', result.rows[0]);
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});