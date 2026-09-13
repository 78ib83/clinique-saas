const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

// 1. CORS en tout premier, avant tout le reste
app.use(cors({
  origin: [
    'https://clinique-saas-production.up.railway.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Gestion explicite des requêtes preflight OPTIONS pour toutes les routes
app.options('*', cors());

// 3. Parser JSON
app.use(express.json());

// 4. Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API SaaS Clinique opérationnelle 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});