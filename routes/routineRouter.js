const express = require('express');
const router = express.Router();
const Routine = require('../models/routineModel');

router.get('/', async (req, res) => {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const routine = new Routine(req.body);
  try {
    const newRoutine = await routine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Routine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Routine deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
