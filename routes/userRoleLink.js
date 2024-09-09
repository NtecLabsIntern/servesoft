const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Role = require('../models/roles');
const UserRoleLink = require('../models/userRoleLink');

/**
 * @swagger
 * /users/{userId}/roles/{roleId}:
 *   post:
 *     name: Attach role users
 *     summary: Attach a user to a role
 *     tags: [User, Role]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the role
 *     responses:
 *       201:
 *         description: User successfully attached to the role
 *       404:
 *         description: User or Role not found
 *       500:
 *         description: Some server error
 */
router.post('/:userId/roles/:roleId', async (req, res) => {
    const { userId, roleId } = req.params;

    try {
        // Check if the user and role exist
        const user = await User.findByPk(userId);
        const role = await Role.findByPk(roleId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        // Check if the user is already attached to the role
        const existingLink = await UserRoleLink.findOne({ where: { user_id: userId, role_id: roleId } });
        if (existingLink) {
            return res.status(400).json({ error: 'User is already assigned to this role' });
        }

        // Attach user to role by creating an entry in the linking table
        await UserRoleLink.create({
            user_id: userId,
            role_id: roleId,
        });

        res.status(201).json({ message: 'User successfully attached to the role' });
    } catch (error) {
        console.error('Error attaching user to role:', error.message);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

module.exports = router;
