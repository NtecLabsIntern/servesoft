// models/item.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Make sure this path is correct

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('main_course', 'dessert', 'appetizer', 'beverage', 'compliment'),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'items',
  timestamps: false // Or true if you are using timestamps
});

module.exports = Item;
