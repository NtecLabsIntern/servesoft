const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration
const User = require('./users'); // Adjust the path to your User model
const Role = require('./roles'); // Adjust the path to your Role model

const UserRoleLink = sequelize.define('user_role_link', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Role,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'user_role_link',
  timestamps: false, // No created_at or updated_at fields
});

User.belongsToMany(Role, {
  through: UserRoleLink,
  foreignKey: 'user_id',
  otherKey: 'role_id',
});

Role.belongsToMany(User, {
  through: UserRoleLink,
  foreignKey: 'role_id',
  otherKey: 'user_id',
});

module.exports = UserRoleLink;
