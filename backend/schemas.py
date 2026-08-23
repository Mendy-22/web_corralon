from pydantic import BaseModel

# Molde de cómo se ve un Producto cuando SALE de la API (hacia el frontend)
class ProductoOut(BaseModel):
    id: int
    nombre: str
    descripcion: str | None = None   # puede venir vacío
    precio: float
    unidad: str | None = None
    imagen: str | None = None
    categoria_id: int

    # Le dice a Pydantic que puede leer datos desde un objeto de SQLAlchemy
    class Config:
        from_attributes = True

# --- Usuarios ---

class UsuarioRegistro(BaseModel):
    """Lo que ENTRA al registrarse."""
    nombre: str
    email: str
    password: str

class UsuarioLogin(BaseModel):
    """Lo que ENTRA al iniciar sesión."""
    email: str
    password: str

class UsuarioOut(BaseModel):
    """Lo que SALE: fijate que NO incluye la contraseña."""
    id: int
    nombre: str
    email: str

    class Config:
        from_attributes = True

class TokenOut(BaseModel):
    """Respuesta del login: el token + los datos del usuario."""
    access_token: str
    tipo: str = "bearer"
    usuario: UsuarioOut    