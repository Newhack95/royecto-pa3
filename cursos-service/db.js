require('dotenv').config();
const sql = require('mssql');

const config = {
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conexion a SQL Server establecida');
    return pool;
  })
  .catch(err => console.error('Fallo la conexion:', err));

module.exports = { sql, poolPromise };