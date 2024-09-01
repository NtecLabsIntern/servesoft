const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Role = require('../models/roles');
const UserRoleLink = require('../models/userRoleLink');

// Define the number of salt rounds (higher = more secure but slower)
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
 *     description: Creates an admin user and links it to the admin role in the user_role_link table if no users exist.
 *     responses:
 *       200:
 *         description: Users already exist, no admin created.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Users already exist. Continuing normally."
 *       201:
 *         description: Master admin user created and assigned the admin role.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Master admin user created and assigned admin role."
 *       500:
 *         description: An error occurred while setting up the admin user.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "An error occurred while linking admin user to role: {error message}"
 */

router.get('/', async (req, res) => {
  try {
    // Check if there are any users in the database
    const userCount = await User.count();

    if (userCount === 0) {
      // Hash the password for the admin user
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

      // Check if the 'admin' role exists
      let adminRole = await Role.findOne({ where: { role_name: 'admin' } });

      if (!adminRole) {
        // Create 'admin' role if it doesn't exist
        adminRole = await Role.create({ role_name: 'admin' });
      }

      // Store the link between the admin user and admin role in the user_role_link table
      await UserRoleLink.create({
        user_id: adminUser.id,
        role_id: adminRole.id
      });

      res.status(201).send('Master admin user created and assigned admin role.');
    } else {
      res.status(200).send('Users already exist. Continuing normally.');
    }
  } catch (error) {
    console.error('Error linking admin user to admin role:', error.message, error.stack);
    res.status(500).send(`An error occurred while linking admin user to role: ${error.message}`);
  }
});

module.exports = router;
