const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../db');

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM cursos');
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
      .query('SELECT * FROM cursos WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { codigo, nombre, creditos, docente } = req.body;

  if (!codigo || !nombre || !creditos || !docente) {
    return res.status(400).json({ error: 'Faltan datos para registrar el curso' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('codigo', sql.VarChar, codigo)
      .input('nombre', sql.VarChar, nombre)
      .input('creditos', sql.Int, creditos)
      .input('docente', sql.VarChar, docente)
      .query(`INSERT INTO cursos (codigo, nombre, creditos, docente)
              OUTPUT INSERTED.id
              VALUES (@codigo, @nombre, @creditos, @docente)`);

    res.status(201).json({ id: result.recordset[0].id, codigo, nombre, creditos, docente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { codigo, nombre, creditos, docente } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('codigo', sql.VarChar, codigo)
      .input('nombre', sql.VarChar, nombre)
      .input('creditos', sql.Int, creditos)
      .input('docente', sql.VarChar, docente)
      .query(`UPDATE cursos SET codigo=@codigo, nombre=@nombre, creditos=@creditos,
              docente=@docente WHERE id=@id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json({ id: req.params.id, codigo, nombre, creditos, docente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM cursos WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json({ mensaje: 'Curso eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
