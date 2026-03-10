require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const userRoutes = require('./routes/userRoutes');




const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('GiveWave API is running ✅');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/user', userRoutes)

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