// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// pick the env-var Render sets by default
const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined!');
}

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  
  // tell pg to use SSL
  dialectOptions: {
    ssl: {
      require: true,
      // skip certificate checks (Render uses a public CA, so you could remove
      // this in a hardened prod setup once you’ve pinned their CA)
      rejectUnauthorized: false,
    }
  },

  // keep idle clients from being dropped
  pool: {
    max: 10,
    min: 0,
    idle: 10_000,     // release after 10s of idle
    acquire: 30_000,  // give up after 30s trying to get a client
    evict: 15_000,    // check for idle clients every 15s
  },

  // send TCP keep-alives on the socket
  dialectModuleOptions: {
    keepAlive: true,
  },
});

module.exports = sequelize;