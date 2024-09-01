const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./roles'); // Ensure this path is correct
const UserRoleLink = require('./userRoleLink'); // Ensure this path is correct

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
  tableName: 'users',
  timestamps: false, // Disable Sequelize's automatic timestamp fields
});

// Define many-to-many relationship with Role through UserRoleLink
User.belongsToMany(Role, {
  through: UserRoleLink,
  foreignKey: 'user_id',
  otherKey: 'role_id',
});

module.exports = User;
