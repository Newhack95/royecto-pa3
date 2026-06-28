-- schema.sql (SQL Server)
CREATE DATABASE cursos_db;
GO
USE cursos_db;
GO

CREATE TABLE cursos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    creditos INT NOT NULL,
    docente VARCHAR(100) NOT NULL
);
GO

INSERT INTO cursos (codigo, nombre, creditos, docente) VALUES
('C001', 'Base de Datos I', 4, 'Jhonny Huaroc'),
('C002', 'Desarrollo de Aplicaciones Web', 5, 'Carlos Mendoza'),
('C003', 'Estructura de Datos', 4, 'Rosa Quispe');
GO
