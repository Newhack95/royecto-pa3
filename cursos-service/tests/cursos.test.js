const request = require('supertest');
const express = require('express');
const cursosRoutes = require('../routes/cursos.routes');

const app = express();
app.use(express.json());
app.use('/api/cursos', cursosRoutes);

describe('GET /api/cursos', () => {
  it('deberia responder con status 200 y un arreglo', async () => {
    const res = await request(app).get('/api/cursos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/cursos', () => {
  it('deberia rechazar registro sin campos obligatorios', async () => {
    const res = await request(app).post('/api/cursos').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('deberia registrar un curso correctamente', async () => {
    const res = await request(app).post('/api/cursos').send({
      codigo: 'CUR001',
      nombre: 'Matematicas',
      creditos: 4,
      docente: 'Prof. García'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});

describe('GET /api/cursos/:id', () => {
  it('deberia retornar 404 si el curso no existe', async () => {
    const res = await request(app).get('/api/cursos/99999');
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /api/cursos/:id', () => {
  it('deberia retornar 404 si el curso no existe', async () => {
    const res = await request(app).put('/api/cursos/99999').send({
      codigo: 'CUR999',
      nombre: 'No existe',
      creditos: 1,
      docente: 'Nadie'
    });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/cursos/:id', () => {
  it('deberia retornar 404 si el curso no existe', async () => {
    const res = await request(app).delete('/api/cursos/99999');
    expect(res.statusCode).toBe(404);
  });
});