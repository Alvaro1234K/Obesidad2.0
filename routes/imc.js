// routes/imc.js

const express = require('express');
const router = express.Router();
const IMC = require('../models/IMC');

// Ruta para guardar el IMC
router.post('/imc', async (req, res) => {
  try {
    const { userId, weight, height, bmi } = req.body;
    const newIMC = new IMC({
      userId,
      weight,
      height,
      bmi
    });
    await newIMC.save();
    res.json({ message: 'IMC guardado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el IMC' });
  }
});

module.exports = router;
