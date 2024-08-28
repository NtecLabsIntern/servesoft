const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Role = require('../models/roles'); // Assuming you have a Role model

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
 *         description: Master admin user created
 *       500:
 *         description: An error occurred while setting up the admin user
 */

const SALT_ROUNDS = 10;

router.get('/', async (req, res) => {
  try {
    const userCount = await User.count();

    if (userCount === 0) {
      // Find the role_id for the 'admin' role
      const adminRole = await Role.findOne({ where: { role_name: 'admin' } });

      if (!adminRole) {
        return res.status(500).send('Admin role not found in the roles table.');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash('admin', SALT_ROUNDS);

      // Create the admin user with the retrieved role_id
      await User.create({
        name: 'admin',
        password: hashedPassword,
        role_id: adminRole.id,  // Use the role_id from the Role table
        tel: '0000000000',
        email: 'admin@example.com',
      });

      res.status(201).send('Master admin user created.');
    } else {
      res.status(200).send('Users already exist. Continuing normally.');
    }
  } catch (error) {
    console.error('Error setting up admin user:', error);
    res.status(500).send('An error occurred while setting up the admin user.');
  }
});

module.exports = router;
