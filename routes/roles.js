// routes/roles.js

const express = require('express');
const router = express.Router();
const Role = require('../models/roles');

// CREATE a new role
/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management operations
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_name
 *             properties:
 *               role_name:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Error creating role
 */
router.post('/', async (req, res) => {
  try {
    const { role_name } = req.body;
    const newRole = await Role.create({ role_name });
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role.' });
  }
});
// READ all roles
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   role_name:
 *                     type: string
 *       500:
 *         description: Error fetching roles
 */
router.get('/', async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Error fetching roles.' });
  }
});
// READ a specific role by ID
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: Role data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 role_name:
 *                   type: string
 *       404:
 *         description: Role not found
 *       500:
 *         description: Error fetching role
 */
router.get('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found.' });
    }
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ message: 'Error fetching role.' });
  }
});
// UPDATE a role by ID
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_name
 *             properties:
 *               role_name:
 *                 type: string
 *                 example: manager
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Error updating role
 */
router.put('/:id', async (req, res) => {
  try {
    const { role_name } = req.body;
    const role = await Role.findByPk(req.params.id);

    if (role) {
      role.role_name = role_name;
      await role.save();
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found.' });
    }
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Error updating role.' });
  }
});
// DELETE a role by ID
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Error deleting role
 */
router.delete('/:id', async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (role) {
      await role.destroy();
      res.status(200).json({ message: 'Role deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Role not found.' });
    }
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Error deleting role.' });
  }
});

module.exports = router;
