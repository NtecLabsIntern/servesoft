const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Role = require('../models/roles'); // Ensure this path is correct
const UserRoleLink = require('../models/userRoleLink'); // Ensure this path is correct

const SALT_ROUNDS = 10;

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin setup operations
 */

/**
 * @swagger
 * /adminSetup:
 *   get:
 *     summary: Setup the master admin user
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Users already exist, continuing normally
 *       201:
 *         description: Master admin user created and linked
 *       500:
 *         description: An error occurred while setting up the admin user
 */
router.get('/', async (req, res) => {
  try {
    const userCount = await User.count();

    if (userCount === 0) {
      // Check if the 'admin' role exists
      let adminRole = await Role.findOne({ where: { role_name: 'admin' } });

      if (!adminRole) {
        // Create 'admin' role if it doesn't exist
        adminRole = await Role.create({ role_name: 'admin' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash('admin', SALT_ROUNDS);

      // Create the admin user
      const adminUser = await User.create({
        name: 'admin',
        password: hashedPassword,
        tel: '0000000000',
        email: 'admin@example.com',
        gender: 'prefer_not_to_say',
        language_preference: 'English',
        address: null,
        DOB: null
      });

      // Link the admin user to the admin role
      await UserRoleLink.create({
        user_id: adminUser.id,
        role_id: adminRole.id
      });

      res.status(201).send('Master admin user created and assigned admin role.');
    } else {
      res.status(200).send('Users already exist. Continuing normally.');
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
    res.status(500).send('An error occurred while setting up the admin user.');
  }
});

module.exports = router;
