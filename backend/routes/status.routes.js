const express = require('express');
const { Status } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, content } = req.body;
    try {
      const newStatus = new Status({ userId, content });
      await newStatus.save();
      res.status(201).json({ message: 'Status created successfully' });
    } catch (error) {
      console.error('Error creating status:', error);
      res.status(500).json({ error: 'Error creating status', details: error.message });
    }
  });


router.get('/', async (req, res) => {
  try {
    const statuses = await Status.find().sort({ createdAt: -1 }).populate('userId', 'username');
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statuses' });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedStatus = await Status.findByIdAndUpdate(id, { content }, { new: true });
    if (!updatedStatus) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: 'Error updating status' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStatus = await Status.findByIdAndDelete(id);
    if (!deletedStatus) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.status(200).json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting status' });
  }
});

module.exports = router;
