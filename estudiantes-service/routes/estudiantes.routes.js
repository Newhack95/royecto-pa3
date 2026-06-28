const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

// trae todos los estudiantes registrados
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM estudiantes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM estudiantes WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { codigo, nombres, apellidos, correo, carrera } = req.body;

  if (!codigo || !nombres || !apellidos || !correo || !carrera) {
    return res.status(400).json({ error: 'Faltan datos para registrar al estudiante' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codigo', sql.VarChar, codigo)
      .input('nombres', sql.VarChar, nombres)
      .input('apellidos', sql.VarChar, apellidos)
      .input('correo', sql.VarChar, correo)
      .input('carrera', sql.VarChar, carrera)
      .query(`INSERT INTO estudiantes (codigo, nombres, apellidos, correo, carrera)
              OUTPUT INSERTED.id
              VALUES (@codigo, @nombres, @apellidos, @correo, @carrera)`);

    res.status(201).json({ id: result.recordset[0].id, codigo, nombres, apellidos, correo, carrera });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { codigo, nombres, apellidos, correo, carrera } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('codigo', sql.VarChar, codigo)
      .input('nombres', sql.VarChar, nombres)
      .input('apellidos', sql.VarChar, apellidos)
      .input('correo', sql.VarChar, correo)
      .input('carrera', sql.VarChar, carrera)
      .query(`UPDATE estudiantes SET codigo=@codigo, nombres=@nombres, apellidos=@apellidos,
              correo=@correo, carrera=@carrera WHERE id=@id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json({ id: req.params.id, codigo, nombres, apellidos, correo, carrera });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM estudiantes WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json({ mensaje: 'Estudiante eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
