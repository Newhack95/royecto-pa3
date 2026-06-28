require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cursosRoutes = require('./routes/cursos.routes');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use('/api/cursos', cursosRoutes);

app.get('/', (req, res) => {
  res.json({ servicio: 'Microservicio de Cursos', estado: 'activo' });
});

app.listen(PORT, () => {
  console.log(`Servicio de cursos escuchando en el puerto ${PORT}`);
});
