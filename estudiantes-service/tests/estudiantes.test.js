const request = require('supertest');
const express = require('express');
const estudiantesRoutes = require('../routes/estudiantes.routes');

const app = express();
app.use(express.json());
app.use('/api/estudiantes', estudiantesRoutes);

describe('GET /api/estudiantes', () => {
  it('deberia responder con status 200 y un arreglo', async () => {
    const res = await request(app).get('/api/estudiantes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/estudiantes', () => {
  it('deberia rechazar registro sin campos obligatorios', async () => {
    const res = await request(app).post('/api/estudiantes').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('deberia registrar un estudiante correctamente', async () => {
    const res = await request(app).post('/api/estudiantes').send({
      codigo: 'EST001',
      nombres: 'Juan',
      apellidos: 'Perez',
      correo: 'juan@test.com',
      carrera: 'Ingeniería'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});

describe('GET /api/estudiantes/:id', () => {
  it('deberia retornar 404 si el estudiante no existe', async () => {
    const res = await request(app).get('/api/estudiantes/99999');
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /api/estudiantes/:id', () => {
  it('deberia retornar 404 si el estudiante no existe', async () => {
    const res = await request(app).put('/api/estudiantes/99999').send({
      codigo: 'EST999',
      nombres: 'No',
      apellidos: 'Existe',
      correo: 'no@test.com',
      carrera: 'Ninguna'
    });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/estudiantes/:id', () => {
  it('deberia retornar 404 si el estudiante no existe', async () => {
    const res = await request(app).delete('/api/estudiantes/99999');
    expect(res.statusCode).toBe(404);
  });
});