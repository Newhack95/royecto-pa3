# \# Proyecto PA3 - Plataforma de Gestión Académica

# 

# \## Arquitectura

# Sistema basado en microservicios independientes:

# \- \*\*estudiantes-service\*\* (puerto 3001): Gestión de estudiantes

# \- \*\*cursos-service\*\* (puerto 3002): Gestión de cursos

# 

# \## Modelo de Datos

# 

# \### Tabla: estudiantes

# | Campo | Tipo | Descripción |

# |-------|------|-------------|

# | id | INT IDENTITY | Clave primaria |

# | codigo | VARCHAR(20) | Código del estudiante |

# | nombres | VARCHAR(100) | Nombres |

# | apellidos | VARCHAR(100) | Apellidos |

# | correo | VARCHAR(100) | Correo electrónico |

# | carrera | VARCHAR(100) | Carrera |

# 

# \### Tabla: cursos

# | Campo | Tipo | Descripción |

# |-------|------|-------------|

# | id | INT IDENTITY | Clave primaria |

# | codigo | VARCHAR(20) | Código del curso |

# | nombre | VARCHAR(100) | Nombre del curso |

# | creditos | INT | Créditos |

# | docente | VARCHAR(100) | Docente |

# 

# \## APIs REST

# 

# \### Microservicio Estudiantes (puerto 3001)

# | Método | Endpoint | Descripción |

# |--------|----------|-------------|

# | GET | /api/estudiantes | Listar todos |

# | GET | /api/estudiantes/:id | Consultar uno |

# | POST | /api/estudiantes | Registrar |

# | PUT | /api/estudiantes/:id | Actualizar |

# | DELETE | /api/estudiantes/:id | Eliminar |

# 

# \### Microservicio Cursos (puerto 3002)

# | Método | Endpoint | Descripción |

# |--------|----------|-------------|

# | GET | /api/cursos | Listar todos |

# | GET | /api/cursos/:id | Consultar uno |

# | POST | /api/cursos | Registrar |

# | PUT | /api/cursos/:id | Actualizar |

# | DELETE | /api/cursos/:id | Eliminar |

# 

# \## Estrategia de Pruebas

# \- Framework: Jest + Supertest

# \- 6 tests por microservicio

# \- Pruebas de integración contra base de datos real

# \- Ejecutar con: `npm test`

# 

# \## Tecnologías

# \- Node.js + Express.js

# \- SQL Server

# \- Jest + Supertest

# \- Git + GitHub

