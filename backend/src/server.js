const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());
app.use(cors());

// Routes de base
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API SaaS Clinique opérationnelle 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
