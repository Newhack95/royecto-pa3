-- schema.sql (SQL Server) - Ejecutar en SSMS antes de iniciar el servicio
CREATE DATABASE estudiantes_db;
GO
USE estudiantes_db;
GO

CREATE TABLE estudiantes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    carrera VARCHAR(100) NOT NULL
);
GO

INSERT INTO estudiantes (codigo, nombres, apellidos, correo, carrera) VALUES
('U001', 'Alexander', 'Calle', 'alexander.calle@uni.edu.pe', 'Ingenieria de Sistemas'),
('U002', 'Maria', 'Fernandez', 'maria.fernandez@uni.edu.pe', 'Ingenieria de Sistemas'),
('U003', 'Jose', 'Ramirez', 'jose.ramirez@uni.edu.pe', 'Ingenieria Civil');
GO
