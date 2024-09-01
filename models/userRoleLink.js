const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserRoleLink = sequelize.define('UserRoleLink', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    }
  }
}, {
  tableName: 'user_role_link',
  timestamps: false, // Set to true if you want automatic timestamps
});

module.exports = UserRoleLink;
