const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users'); // Ensure this path is correct
const UserRoleLink = require('./userRoleLink'); // Ensure this path is correct

const Role = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'roles',
  timestamps: false, // Disable Sequelize's automatic timestamp fields
});

// // In your Role model
// Role.belongsToMany(User, {
//   through: UserRoleLink,
//   foreignKey: 'role_id',
// });

module.exports = Role;
