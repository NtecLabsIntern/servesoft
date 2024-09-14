const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Adjust the path as necessary
const UserRoleLink = require('../models/userRoleLink'); // Ensure this is the correct path
const Role = require('../models/roles'); // Ensure this is the correct path

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable in production

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 * 
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token returned on successful login
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Some server error
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role,
        through: { attributes: [] }, // Exclude the join table attributes from the result
        attributes: ['role_name'],
      },
    });

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    // Extract role names from the result
    const roles = user.roles.map(role => role.role_name);

    // Generate JWT token including user roles
    const token = jwt.sign({ userId: user.id, name: user.name, roles }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
