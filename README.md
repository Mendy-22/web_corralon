# Corralón Gran Unión — Sistema de gestión de compras

Aplicación web full-stack para un corralón de materiales de construcción. Permite explorar el catálogo de productos, armar un carrito, registrarse e iniciar sesión, y confirmar una compra con datos de envío a domicilio.

Proyecto personal desarrollado para practicar el desarrollo full-stack con Python y bases de datos relacionales.

---

## Tecnologías

**Backend**
- Python 3.12
- FastAPI — framework de la API REST
- PostgreSQL 16 — base de datos relacional
- SQLAlchemy — ORM
- Pydantic — validación de datos de entrada y salida
- python-jose — generación y validación de JWT
- passlib + bcrypt — hasheo de contraseñas

**Frontend**
- HTML5, CSS3 y JavaScript (sin frameworks)
- Fetch API para consumir el backend

---

## Funcionalidades

- Catálogo de productos servido desde PostgreSQL, con filtro por categoría (construcción tradicional / en seco)
- Registro de usuarios con contraseñas hasheadas (bcrypt)
- Inicio de sesión con autenticación por JWT
- Sesión persistente entre páginas mediante token en `localStorage`
- Carrito de compras con control de cantidades y subtotales
- Página de carrito protegida: redirige al login si no hay sesión activa
- Menú dinámico que cambia según el estado de la sesión
- Formulario de envío a domicilio y confirmación de compra
- Documentación interactiva de la API autogenerada (Swagger UI)

---

## Estructura del proyecto

```
web_corralon/
├── backend/
│   ├── main.py           # Aplicación FastAPI y endpoints
│   ├── database.py       # Conexión a PostgreSQL
│   ├── models.py         # Modelos SQLAlchemy (tablas)
│   ├── schemas.py        # Schemas Pydantic (validación)
│   ├── auth.py           # Hasheo de contraseñas y JWT
│   ├── seed.py           # Carga inicial de productos
│   ├── requirements.txt
│   └── .env.example
├── imagen/               # Recursos gráficos
├── index.html            # Página de inicio
├── traditional.html      # Catálogo de construcción tradicional
├── seco.html             # Catálogo de construcción en seco
├── carrito.html          # Carrito y confirmación de compra
├── login.html            # Login y registro
├── catalogo.js           # Consumo de la API de productos
├── logica.js             # Lógica de carrito, sesión y compra
└── style.css
```

---

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Lista todos los productos |
| GET | `/api/productos?categoria=tradicional` | Filtra por categoría |
| POST | `/api/auth/registro` | Crea una cuenta nueva |
| POST | `/api/auth/login` | Inicia sesión y devuelve un JWT |

Con el servidor corriendo, la documentación interactiva está disponible en `http://127.0.0.1:8080/docs`.

---

## Modelo de datos

- **categorias** — id, nombre
- **productos** — id, nombre, descripcion, precio, unidad, imagen, categoria_id *(FK)*
- **usuarios** — id, nombre, email *(único)*, password_hash

---

## Instalación y uso

### Requisitos previos
- Python 3.11 o superior
- PostgreSQL 16
- Una extensión de servidor local para el frontend (por ejemplo, Live Server de VS Code)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Mendy-22/web_corralon.git
cd web_corralon
```

### 2. Crear la base de datos

Desde pgAdmin o psql, crear una base llamada `corralon_db`.

### 3. Configurar el backend

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1
# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt
```

### 4. Variables de entorno

Copiar `.env.example` a `.env` y completar con los valores propios:

```
DB_PASSWORD=tu_password_de_postgres
CLAVE_SECRETA=una_cadena_larga_y_aleatoria
```

Para generar la clave secreta:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 5. Cargar los productos iniciales

```bash
python seed.py
```

### 6. Levantar el servidor

```bash
uvicorn main:app --reload --port 8080
```

La API queda disponible en `http://127.0.0.1:8080`.

### 7. Abrir el frontend

Abrir `index.html` con Live Server (`http://127.0.0.1:5500`). Ese origen ya está habilitado en la configuración de CORS del backend.

---

## Decisiones técnicas

**Separación entre modelos y schemas.** Los modelos de SQLAlchemy definen cómo se almacenan los datos; los schemas de Pydantic definen qué entra y qué sale de la API. Gracias a esa separación, el campo `password_hash` nunca se expone en las respuestas.

**Autenticación con JWT.** El token se firma en el servidor con una clave secreta, por lo que el cliente no puede alterarlo. Se guarda en `localStorage` para que la sesión persista entre páginas.

**Credenciales fuera del código.** La contraseña de la base de datos y la clave de firma se leen desde un archivo `.env` excluido del repositorio.

---

## Próximas mejoras

- Persistir los pedidos en la base de datos (tablas `pedidos` y `pedido_items`)
- Endpoint protegido `POST /api/pedidos` y consulta del historial de compras
- Panel de administración para gestionar el stock
- Despliegue en un servicio de hosting

---

## Autor

**Ismael** — Estudiante de la Tecnicatura en Programación, Universidad Nacional Guillermo Brown
GitHub: [@Mendy-22](https://github.com/Mendy-22)