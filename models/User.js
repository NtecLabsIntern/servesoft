// // models/User.js contains the database mode
// const pool = require('../config/database');

// const User = {
//     async findAdmin() {
//         const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', ['admin']);
//         return rows[0];
//     },

//     async createAdmin(name, hashedPassword, email) {
//         await pool.query(
//             'INSERT INTO users (name, password, email, role) VALUES (?, ?, ?, ?)',
//             [name, hashedPassword, email, 'admin']
//         );
//     },
// };

// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DOB: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    defaultValue: 'prefer_not_to_say',
  },
  tel: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language_preference: {
    type: DataTypes.STRING(50),
    defaultValue: 'English',
  },
  role: {
    type: DataTypes.ENUM('admin', 'waiter', 'chef', 'manager', 'other'),
    defaultValue: 'other',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'users', // Ensure the table name matches your database
  timestamps: false,  // Disable Sequelize's automatic timestamp fields
});


module.exports = User;
