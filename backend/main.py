from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models
import schemas
import auth

# Al arrancar, crea las tablas en corralon_db si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Corralón Gran Unión")

# --- CORS: la "lista de invitados" de origenes autorizados ---
origenes_permitidos = [
    "http://127.0.0.1:5500", # Live server de VS Code
    "http://localhost:5500", # la misma, con "localhost"
    "http://127.0.0.1:5501", # por si Live Server usa otro puerto
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origenes_permitidos, # quien puede pedirte datos
    allow_credentials=True,
    allow_methods=["*"],               # permite GET, POST, PUT, DELETE...
    allow_headers=["*"],               # permite todas las cabeceras
)

# Dependencia: abre una sesión de BD por request y la cierra al terminar
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def inicio():
    return {"mensaje": "API del Corralón Gran Unión funcionando"}

# Endpoint: devuelve todos los productos (o filtra por categoría)
@app.get("/api/productos", response_model=list[schemas.ProductoOut])
def listar_productos(categoria: str | None = None, db: Session = Depends(get_db)):
    consulta = db.query(models.Producto)

    # Si pasan ?categoria=tradicional o ?categoria=seco, filtramos
    if categoria:
        consulta = consulta.join(models.Categoria).filter(models.Categoria.nombre == categoria)

    return consulta.all()

# =============================================
# AUTENTICACION
# =============================================


@app.post("/api/auth/registro" , response_model=schemas.UsuarioOut)
def registrar_usuario(datos: schemas.UsuarioRegistro, db: Session = Depends(get_db)):
    # 1. Verificar que el email no este no este ya registro
    existente = db.query (models.Usuario).filter (models.Usuario.email == datos.email).first()
    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ese email ya está registrado"
        )
        
    # 2. Crear el usuario con la contraseña hasheada
    nuevo = models.Usuario(
        nombre=datos.nombre,
        email=datos.email,
        password_hash=auth.hashear_password(datos.password)
    )
    
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    
    return nuevo

@app.post("/api/auth/login", response_model=schemas.TokenOut)
def iniciar_sesion(datos: schemas.UsuarioLogin, db: Session = Depends (get_db)):
    # 1. Buscar Usuario por email
    usuario = db.query(models.Usuario).filter(models.Usuario.email == datos.email).first()
    
    # 2. Verificar que exista Y que la contraseña coincida
    if not usuario or not auth.verificar_password(datos.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )
        
    # 3. Generar el token con el id del usuario dentro
    token = auth.crear_token({"sub": str(usuario.id)})
    
    return {
        "access_token": token,
        "tipo": "bearer",
        "usuario": usuario
    }    