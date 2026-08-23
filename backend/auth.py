import os
from dotenv import load_dotenv

load_dotenv()

from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt, JWTError

# --- Configuracion ---
# La clave secreta se lee desde el archivo .env
CLAVE_SECRETA = os.getenv("CLAVE_SECRETA")
ALGORITMO = "HS256"
MINUTOS_EXPIRACION = 60 * 24  # el token dura 24 horas

# Contexto de hasheo con bcrypt
contexto_pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hashear_password(password: str) -> str:
    """Convierte una contrasena en su hash (irreversible)."""
    return contexto_pwd.hash(password)


def verificar_password(password_plana: str, password_hash: str) -> bool:
    """Compara la contraseña ingresada contra el hash guardado."""
    return contexto_pwd.verify(password_plana, password_hash)


def crear_token(datos: dict) -> str:
    """Genera un JWT firmado que identifica al usuario."""
    a_codificar = datos.copy()
    expira = datetime.now(timezone.utc) + timedelta(minutes=MINUTOS_EXPIRACION)
    a_codificar.update({"exp": expira})
    return jwt.encode(a_codificar, CLAVE_SECRETA, algorithm=ALGORITMO)


def verificar_token(token: str) -> dict | None:
    """Valida la firma del token. Devuelve los datos o None si es inválido."""
    try:
        return jwt.decode(token, CLAVE_SECRETA, algorithms=[ALGORITMO])
    except JWTError:
        return None