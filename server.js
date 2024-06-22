const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://alvaroantonio1236:<FgJunKqOBYl6QUwj>@obesidad.uug0qla.mongodb.net/?retryWrites=true&w=majority&appName=Obesidad', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Esquema y modelo para el IMC
const imcSchema = new mongoose.Schema({
  userId: String,
  weight: Number,
  height: Number,
  bmi: Number,
  date: { type: Date, default: Date.now }
});

const IMC = mongoose.model('IMC', imcSchema);

// Ruta para guardar el IMC
app.post('/imc', async (req, res) => {
  try {
    const { userId, weight, height } = req.body;
    const bmi = calculateBMI(weight, height);
    const newIMC = new IMC({ userId, weight, height, bmi });
    await newIMC.save();
    res.json({ message: 'IMC guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el IMC:', error);
    res.status(500).json({ error: 'Error al guardar el IMC' });
  }
});

// Esquema y modelo para las rutinas
const routineSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Routine = mongoose.model('Routine', routineSchema);

// Obtener todas las rutinas
app.get('/routines', async (req, res) => {
  try {
    const routines = await Routine.find();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Guardar una nueva rutina
app.post('/routines', async (req, res) => {
  const routine = new Routine(req.body);
  try {
    const newRoutine = await routine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una rutina
app.put('/routines/:id', async (req, res) => {
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoutine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una rutina
app.delete('/routines/:id', async (req, res) => {
  try {
    await Routine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Routine deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Función para calcular el IMC
const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
