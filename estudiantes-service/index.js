require('dotenv').config();
const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantes.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/estudiantes', estudiantesRoutes);

app.get('/', (req, res) => {
  res.json({ servicio: 'Microservicio de Estudiantes', estado: 'activo' });
});

app.listen(PORT, () => {
  console.log(`Servicio de estudiantes escuchando en el puerto ${PORT}`);
});
