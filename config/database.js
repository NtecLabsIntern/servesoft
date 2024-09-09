// config/database.js

// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// module.exports = pool;

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost', 
  dialect: 'mysql', // Dialect (MySQL in this case)
  logging:false,   // Disable logging (optional)
});

// // Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

module.exports = sequelize;
