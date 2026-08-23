import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Carga las variables definidas en el archivo .env
load_dotenv()

# Leemos la contraseña desde el .env en vez de escribirla acá
DB_PASSWORD = os.getenv("DB_PASSWORD")

# La f antes de las comillas permite insertar {DB_PASSWORD} dentro del texto
URL_CONEXION = f"postgresql://postgres:{DB_PASSWORD}@localhost:5432/corralon_db"

# El "engine" es el motor que mantiene la conexión con la base
engine = create_engine (URL_CONEXION)

# SessionLocal: cada request abrirá una sesión para hablar con la base
SessionLocal = sessionmaker (autocommit=False, autoflush=False, bind=engine)

#Base: clase de la que heredan todos los modelos (las tablas)
Base = declarative_base()