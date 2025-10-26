// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use DATABASE_URL — standard across Render, Railway, Supabase, Neon, etc.
const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined! Please check your .env file.');
}

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // set to true if your provider gives you a valid CA
    },
  },

  pool: {
    max: 10,
    min: 0,
    idle: 10_000,     // release idle connections after 10s
    acquire: 30_000,  // timeout if no connection after 30s
    evict: 15_000,    // clean idle clients every 15s
  },

  dialectModuleOptions: {
    keepAlive: true,  // helps prevent dropped connections
  },

  logging: false, // optional — disables noisy SQL logs
});

module.exports = sequelize;
