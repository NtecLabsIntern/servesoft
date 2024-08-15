// routes/adminSetup.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin setup operations
 */

/**
 * @swagger
 * /setup-admin:
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
router.get('/setup-admin', async (req, res) => {
  try {
    const userCount = await User.count();

    if (userCount === 0) {
      await User.create({
        name: 'admin',
        password: 'admin', // You should hash this password in production
        role: 'admin',
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


module.exports = router;
