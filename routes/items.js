// routes/items.js

const express = require('express');
const router = express.Router();
const Item = require('../models/items');

// Create an Item
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pasta"
 *               description:
 *                 type: string
 *                 example: "Delicious homemade pasta."
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 12.99
 *               category:
 *                 type: string
 *                 enum: [main_course, dessert, appetizer, beverage, compliment]
 *                 example: main_course
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/images/pasta.jpg"
 *     responses:
 *       201:
 *         description: The item was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Pasta"
 *                 description:
 *                   type: string
 *                   example: "Delicious homemade pasta."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 12.99
 *                 category:
 *                   type: string
 *                   example: main_course
 *                 image_url:
 *                   type: string
 *                   example: "https://example.com/images/pasta.jpg"
 *       400:
 *         description: Bad request. Invalid input data.
 */
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all Items
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve a list of all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Pasta"
 *                   description:
 *                     type: string
 *                     example: "Delicious homemade pasta."
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 12.99
 *                   category:
 *                     type: string
 *                     example: main_course
 *                   image_url:
 *                     type: string
 *                     example: "https://example.com/images/pasta.jpg"
 */
router.get('/', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read a single Item
/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retrieve a single item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
 *     responses:
 *       200:
 *         description: A single item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Pasta"
 *                 description:
 *                   type: string
 *                   example: "Delicious homemade pasta."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 12.99
 *                 category:
 *                   type: string
 *                   example: main_course
 *                 image_url:
 *                   type: string
 *                   example: "https://example.com/images/pasta.jpg"
 *       404:
 *         description: Item not found.
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an Item
/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pasta"
 *               description:
 *                 type: string
 *                 example: "Delicious homemade pasta."
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 12.99
 *               category:
 *                 type: string
 *                 enum: [main_course, dessert, appetizer, beverage, compliment]
 *                 example: main_course
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/images/pasta.jpg"
 *     responses:
 *       200:
 *         description: The item was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Pasta"
 *                 description:
 *                   type: string
 *                   example: "Delicious homemade pasta."
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 12.99
 *                 category:
 *                   type: string
 *                   example: main_course
 *                 image_url:
 *                   type: string
 *                   example: "https://example.com/images/pasta.jpg"
 *       404:
 *         description: Item not found.
 */
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.update(req.body);
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an Item
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item ID
 *     responses:
 *       204:
 *         description: The item was successfully deleted.
 *       404:
 *         description: Item not found.
 */
router.delete('/:id', async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id);
      if (item) {
        await item.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  module.exports = router;
  