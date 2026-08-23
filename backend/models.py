from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Categoria(Base):
    __tablename__ = "categorias"
    
    id = Column (Integer, primary_key=True, index=True)
    nombre = Column (String, unique =True, nullable=False) #"tradicional" o "seco"
    
    productos = relationship("Producto", back_populates="categoria")
    
class Producto(Base):
    __tablename__ = "productos"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    precio = Column(Float, nullable=False)
    unidad = Column(String)
    imagen = Column(String)
    categoria_id = Column(Integer, ForeignKey("categorias.id"))
    
    categoria = relationship ("Categoria", back_populates="productos")

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column (Integer, primary_key= True, index= True)
    email = Column (String, unique= True, nullable= False, index= True)
    nombre = Column (String, nullable= False)
    password_hash = Column (String, nullable= False) # NUNCA el password en texto plano           