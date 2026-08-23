# Script de carga inicial (seed): llena las tablas con los productos del catálogo.
# Se corre UNA sola vez, a mano. No es parte del servidor.

from database import SessionLocal, engine, Base
import models

# Nos aseguramos de que las tablas existan antes de insertar
Base.metadata.create_all(bind=engine)

# Abrimos una sesión para hablar con la base
db = SessionLocal()

# --- Evitar duplicados: si ya hay productos, no volvemos a cargar ---
if db.query(models.Producto).count() > 0:
    print("⚠️  La base ya tiene productos. No se cargó nada para evitar duplicados.")
    db.close()
    exit()

# --- 1. Crear las categorías ---
cat_tradicional = models.Categoria(nombre="tradicional")
cat_seco = models.Categoria(nombre="seco")

db.add(cat_tradicional)
db.add(cat_seco)
db.commit()  # Confirmamos para que las categorías obtengan su id

# Refrescamos para leer los id recién generados
db.refresh(cat_tradicional)
db.refresh(cat_seco)

# --- 2. Productos de construcción tradicional ---
productos_tradicionales = [
    {"nombre": "Ladrillo Hueco 18x18x33", "descripcion": "Ideal para muros exteriores e interiores", "precio": 150, "unidad": "Por unidad", "imagen": "imagen/product-traditional/ladrillo-hueco.png"},
    {"nombre": "Arena Gruesa x m³", "descripcion": "Material para mezcla de hormigon", "precio": 3200, "unidad": "Por m³", "imagen": "imagen/product-traditional/arera-fina.png"},
    {"nombre": "Cal Hidratada", "descripcion": "Para revoques y mezclas con arena", "precio": 4200, "unidad": "Por bolsa", "imagen": "imagen/product-traditional/cal-hidratada.png"},
    {"nombre": "Hierro del 8mm", "descripcion": "Barras para estructuras de hormigon armado", "precio": 2000, "unidad": "Por barra", "imagen": "imagen/product-traditional/hierro-8mm.png"},
    {"nombre": "Ceresita", "descripcion": "Activo liquido para mejorar", "precio": 4000, "unidad": "Por unidad de 5L", "imagen": "imagen/product-traditional/ceresita.png"},
    {"nombre": "Menbrana Asfaltica", "descripcion": "Impermeabilización de techos planos", "precio": 12000, "unidad": "Por rollo", "imagen": "imagen/product-traditional/menbrana-asfaltica.png"},
    {"nombre": "Ceramicos Para Pisos", "descripcion": "Revestimiento cerámico para interiores", "precio": 6500, "unidad": "Por m²", "imagen": "imagen/product-traditional/ceramicos-para-pisos.png"},
    {"nombre": "Teja Conial Natural", "descripcion": "Cubierta tradicional para techos inclinados tipo natural", "precio": 450, "unidad": "Por unidad", "imagen": "imagen/product-traditional/teja-cononial-narutal_20x44.png"},
    {"nombre": "Teja Conial Rojo", "descripcion": "Cubierta tradicional para techos inclinados rojo", "precio": 450, "unidad": "Por unidad", "imagen": "imagen/product-traditional/teja-cononial-rojo_26x24.png"},
    {"nombre": "Cemento Blanco 50 kg", "descripcion": "Bolsa de 50 kg para mezcla de hormigón, revoques, etc.", "precio": 6800, "unidad": "Por bolsa", "imagen": "imagen/product-traditional/Cemento_Avellaneda.png"},
]

# --- 3. Productos de construcción en seco ---
productos_seco = [
    {"nombre": "Adhsivo Klaukol", "descripcion": "Pegamento especial para placas cementicias o de yeso", "precio": 3500, "unidad": "Por pote de 4 kg", "imagen": "imagen/product-seco/adhesivo-klaukol-para-ceramicos-sobre-placa-yeso-x-7-removebg-preview.png"},
    {"nombre": "Lana De Viderio", "descripcion": "Aislante termico y acústico para muros y techos", "precio": 9000, "unidad": "Por rollo", "imagen": "imagen/product-seco/lana-vidrio_50mm-rollo_12m2.png"},
    {"nombre": "Masilla Para Juntas", "descripcion": "Para sellado entre placas de yeso", "precio": 4200, "unidad": "Por pote de 5 kg", "imagen": "imagen/product-seco/masilla-juntas_5kg.png"},
    {"nombre": "Perfil Solera U 35 x 0,52 x 2,60 m", "descripcion": "Es la base y la guía donde se apoyan y fijan los perfiles montantes C", "precio": 3075, "unidad": "Por unidad", "imagen": "imagen/product-seco/perfil-solera_U__30x35x2600mm.png"},
    {"nombre": "Perfil Montaje C 69 x 0,52 - 2,60 m", "descripcion": "Es la estructura vertical resistente del tabique", "precio": 4657, "unidad": "Por unidad", "imagen": "imagen/product-seco/perfil-c-galvanizado-_100x45x1_60.png"},
    {"nombre": "Placa Cementicia Exterior de 1,20m x 2,40m y espesor de 12,5mm", "descripcion": "Placa recistente a la humedad de extereriores", "precio": 8500, "unidad": "Por unidad", "imagen": "imagen/product-seco/placa-cementicia-exterior.png"},
    {"nombre": "Placa Yeso interior de 1,20m x 2,40m y espesor de 12,5mm", "descripcion": "Placa de yeso interior reforzada para tabiques y cielorrasos.", "precio": 12724, "unidad": "Por unidad", "imagen": "imagen/product-seco/placa-yeso-durlock-interior.png"},
    {"nombre": "Cielorraso Desmontable Acústico 60x60", "descripcion": "Paneles para cielorrasos suspendidos", "precio": 6000, "unidad": "Por m²", "imagen": "imagen/product-seco/cielo-raso-desmontableacus_60x60.png"},
    {"nombre": "Piso Flotante Melaminico 2,44m x 2,25m y espesor 7mm", "descripcion": "Revestimiento de rápida instalación para interiores", "precio": 7800, "unidad": "Por m²", "imagen": "imagen/product-seco/piso-flotante_espesor7mm-ancho_244mm_laro_2.025_mm.png"},
    {"nombre": "Revestimiento Simil Tipo PVC", "descripcion": "Para paredes interiores, fácil limpieza y colocación", "precio": 5200, "unidad": "Por m²", "imagen": "imagen/product-seco/revestimiento-simil-tipo_pvc.png"},
    {"nombre": "Tornillo Autoperforante 4,8x55mm", "descripcion": "Para fijación de placas a perfiles", "precio": 3000, "unidad": "Por caja de 500", "imagen": "imagen/product-seco/tornillo-autoperforante_4_8x55mm.png"},
]

# --- 4. Insertar todos los productos con su categoría ---
for p in productos_tradicionales:
    db.add(models.Producto(**p, categoria_id=cat_tradicional.id))

for p in productos_seco:
    db.add(models.Producto(**p, categoria_id=cat_seco.id))

db.commit()  # Confirmamos la inserción de todos los productos

# --- 5. Informe final ---
total = db.query(models.Producto).count()
print(f"✅ Carga completa: {total} productos insertados.")
print(f"   - Tradicionales: {len(productos_tradicionales)}")
print(f"   - En seco: {len(productos_seco)}")

db.close()