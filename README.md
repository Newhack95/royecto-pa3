# PA3 - Plataforma Academica con Microservicios

Proyecto backend con arquitectura de microservicios para la gestion de estudiantes y cursos de la Universidad Tecnologica XYZ.

## Arquitectura

```
proyecto-pa3/
├── estudiantes-service/   (puerto 3001)
├── cursos-service/        (puerto 3002)
└── README.md
```

Cada microservicio tiene su propia base de datos en SQL Server (estudiantes_db y cursos_db), por lo que pueden desplegarse y escalar de forma independiente.

## Como ejecutarlo

1. Abre SQL Server Management Studio y ejecuta el `schema.sql` de cada servicio (crea la base y la tabla con datos de prueba).
2. En cada carpeta de servicio:
```bash
npm install
```
3. Copia `.env.example` a `.env`. Si tu SQL Server usa autenticacion de Windows, deja DB_USER y DB_PASSWORD vacios. Si usas un usuario de SQL, complétalos.
4. Inicia el servicio:
```bash
npm start
```

## Endpoints

### Estudiantes (http://localhost:3001/api/estudiantes)
- GET /api/estudiantes
- GET /api/estudiantes/:id
- POST /api/estudiantes
- PUT /api/estudiantes/:id
- DELETE /api/estudiantes/:id

### Cursos (http://localhost:3002/api/cursos)
- GET /api/cursos
- GET /api/cursos/:id
- POST /api/cursos
- PUT /api/cursos/:id
- DELETE /api/cursos/:id

## Pruebas
```bash
npm test
```
