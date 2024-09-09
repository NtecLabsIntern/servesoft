const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const authorize = require('../middlewares/authorizationMiddleware');
const jwt = require('jsonwebtoken');



const SALT_ROUNDS = 10;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - DOB
 *         - gender
 *         - tel
 *         - email
 *         - address
 *         - language_preference
 *        
 * 
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         name:
 *           type: string
 *           description: The user's name
 *         password:
 *           type: string
 *           description: The user's password
 *         DOB:
 *           type: string
 *           format: date
 *           description: The user's date of birth
 *         gender:
 *           type: string
 *           enum: [male, female, other, prefer_not_to_say]
 *           description: The user's gender
 *         tel:
 *           type: string
 *           description: The user's phone number
 *         email:
 *           type: string
 *           description: The user's email
 *         address:
 *           type: string
 *           description: The user's address
 *         language_preference:
 *           type: string
 *           description: The user's language preference
 *       example:
 *         name: John Doe
 *         password: password123
 *         DOB: 1990-01-01
 *         gender: male
 *         tel: 1234567890
 *         email: johndoe@example.com
 *         address: 123 Main St, Springfield
 *         language_preference: English
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
//user creation
router.post('/', authorize(['admin']), async (req, res) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  
      // Create the new user with hashed password
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
//read all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users/{name}:
 *   get:
 *     summary: Get the user by name
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user name
 *     responses:
 *       200:
 *         description: The user description by Name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 */
// Find user by name (change findByPk to findOne with where condition)
router.get('/:name', async (req, res) => {
    try {
      const user = await User.findOne({ where: { name: req.params.name } });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /users/{name}:
 *   put:
 *     summary: Update the user by Name
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The user name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 */
// Update user by name
router.put('/:name', async (req, res) => {
    try {
      const user = await User.findOne({ where: { name: req.params.name } });
      if (user) {
        let updatedData = req.body;
  
        // If password is being updated, hash the new password
        if (req.body.password) {
          const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
          updatedData.password = hashedPassword;
        }
  
        await user.update(updatedData);
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
/**
 * @swagger
 * /users/{name}:
 *   delete:
 *     summary: Remove the user by Name
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user name
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 */
// Delete user by name
router.delete('/:name', async (req, res) => {
    try {
      const user = await User.findOne({ where: { name: req.params.name } });
      if (user) {
        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
