require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB Connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL with SSL');
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

// Sync models
sequelize.sync()
  .then(() => console.log('✅ Database synchronized'))
  .catch(err => console.error('❌ Sync failed:', err));

// ✅ API ROUTES — MUST BE BEFORE THE FRONTEND CATCH-ALL
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const petRoutes = require('./routes/petRoutes');
app.use('/api/pets', petRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

const userDetailsRoutes = require('./routes/userDetailsRoutes');
app.use('/api/user-details', userDetailsRoutes);

// ✅ Serve frontend build (React)
app.use(express.static(path.join(__dirname, 'build')));

// ✅ Catch-all for client-side routing (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Start server after DB sync
sequelize.sync()
  .then(() => {
    console.log('✅ Database synchronized');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('❌ Error syncing database:', err));
