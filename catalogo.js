// Productos para construccion tradicional
const productosTradicionales = [
    {
        id: 1,
        nombre: "Ladrillo Hueco 18x18x33",
        descripcion: "Ideal para muros exteriores e interiores",
        precio: 150,
        unidad: "Por unidad",
        imagen: "imagen/product-traditional/ladrillo-hueco.png"
    },
    {
        id: 2,
        nombre: "Arena Gruesa x m³",
        descripcion: "Material para mezcla de hormigon",
        precio: 3200,
        unidad: "Por m³",
        imagen: "imagen/product-traditional/arera-fina.png"
    },
    {
        id: 3,
        nombre: "Cal Hidratada ",
        descripcion: "Para revoques y mezclas con arena",
        precio: 4200,
        unidad: "Por bolsa",
        imagen: "imagen/product-traditional/cal-hidratada.png"
    },
    {
        id: 4,
        nombre: "Hierro del 8mm",
        descripcion: "Barras para estructuras de hormigon armado",
        precio: 2000,
        unidad: "Por barra",
        imagen: "imagen/product-traditional/hierro-8mm.png"
    },
    {
        id: 5,
        nombre: "Ceresita",
        descripcion: "Activo liquido para mejorar",
        precio: 4000,
        unidad: "Por unidad de 5L",
        imagen: "imagen/product-traditional/ceresita.png"
    },
    {
        id: 6,
        nombre: "Menbrana Asfaltica",
        descripcion: "Impermeabilización de techos planos",
        precio: 12000,
        unidad: "Por rollo",
        imagen: "imagen/product-traditional/menbrana-asfaltica.png"
    },
    {
        id: 7,
        nombre: "Ceramicos Para Pisos",
        descripcion: "Revestimiento cerámico para interiores",
        precio: 6500,
        unidad: "Por m²",
        imagen: "imagen/product-traditional/ceramicos-para-pisos.png"
    },
    {
        id: 8,
        nombre: "Teja Conial Natural",
        descripcion: "Cubierta tradicional para techos inclinados tipo natural",
        precio: 450,
        unidad: "Por unidad",
        imagen: "imagen/product-traditional/teja-cononial-narutal_20x44.png"
    },
    {
        id: 9,
        nombre: "Teja Conial Rojo",
        descripcion: "Cubierta tradicional para techos inclinados rojo",
        precio: 450,
        unidad: "Por unidad",
        imagen: "imagen/product-traditional/teja-cononial-rojo_26x24.png"
    },
    {
        id: 10,
        nombre: "Cemento Blanco 50 kg",
        descripcion: "Bolsa de 50 kg para mezcla de hormigón, revoques, etc.",
        precio: 6800,
        unidad: "Por bolsa",
        imagen: "imagen/product-traditional/Cemento_Avellaneda.png"
    },
];

// Productos para construccion en seco
const productosSeco = [
    {
        id: 100, 
        nombre: "Adhsivo Klaukol",
        descripcion: "Pegamento especial para placas cementicias o de yeso",
        precio: 3500,
        unidad: "Por pote de 4 kg",
        imagen: "imagen/product-seco/adhesivo-klaukol-para-ceramicos-sobre-placa-yeso-x-7-removebg-preview.png"
    },
    {
        id: 101,
        nombre: "Lana De Viderio",
        descripcion: "Aislante termico y acústico para muros y techos",
        precio: 9000,
        unidad: "Por rollo",
        imagen: "imagen/product-seco/lana-vidrio_50mm-rollo_12m2.png"
    },
    {
        id: 102,
        nombre: "Masilla Para Juntas",
        descripcion: "Para sellado entre placas de yeso",
        precio: 4200,
        unidad: "Por pote de 5 kg",
        imagen: "imagen/product-seco/masilla-juntas_5kg.png"
    },
    {
        id: 103,
        nombre: "Perfil Solera U 35 x 0,52 x 2,60 m",
        descripcion: "Es la base y la guía donde se apoyan y fijan los perfiles montantes C",
        precio: 3075,
        unidad: "Por unidad",
        imagen: "imagen/product-seco/perfil-solera_U__30x35x2600mm.png"
    },
    {
        id: 104,
        nombre: "Perfil Montaje C 69 x 0,52 - 2,60 m",
        descripcion: "Es la estructura vertical resistente del tabique",
        precio: 4.657,
        unidad: "Por unidad",
        imagen: "imagen/product-seco/perfil-c-galvanizado-_100x45x1_60.png"
    },
    {
        id: 105,
        nombre: "Placa Cementicia Exterior de 1,20m x 2,40m y espesor de 12,5mm",
        descripcion: "Placa recistente a la humedad de extereriores",
        precio: 8500,
        unidad: "Por unidad",
        imagen: "imagen/product-seco/placa-cementicia-exterior.png"
    },
    {
        id: 106,
        nombre: "Placa Yeso interior de 1,20m x 2,40m y espesor de 12,5mm",
        descripcion: "Placa de yeso interior reforzada para tabiques y cielorrasos.",
        precio: 12724,
        unidad: "Por unidad",
        imagen: "imagen/product-seco/placa-yeso-durlock-interior.png"
    },
    {
        id: 107,
        nombre: "Cielorraso Desmontable Acústico 60x60",
        descripcion: "Paneles para cielorrasos suspendidos",
        precio: 6000,
        unidad: "Por m²",
        imagen: "imagen/product-seco/cielo-raso-desmontableacus_60x60.png"
    },
    {
        id: 108,
        nombre: "Piso Flotante Melaminico 2,44m x 2,25m y espesor 7mm",
        descripcion: "Revestimiento de rápida instalación para interiores",
        precio: 7800,
        unidad: "Por m²",
        imagen: "imagen/product-seco/piso-flotante_espesor7mm-ancho_244mm_laro_2.025_mm.png"
    },
    {
        id: 109,
        nombre: "Revestimiento Simil Tipo PVC",
        descripcion: "Para paredes interiores, fácil limpieza y colocación",
        precio: 5200,
        unidad: "Por m²",
        imagen: "imagen/product-seco/revestimiento-simil-tipo_pvc.png"
    },
    {
        id: 110,
        nombre: "Tornillo Autoperforante 4,8x55mm",
        descripcion: "Para fijación de placas a perfiles",
        precio: 3000,
        unidad: "Por caja de 500",
        imagen: "imagen/product-seco/tornillo-autoperforante_4_8x55mm.png"
    }
]