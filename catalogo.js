// =================================
// Catalogo conectado al backend
// =================================

const API_URL = "http://127.0.0.1:8080";

// Arrays vacios: se llenan con los datos que traiga el backend
let productosTradicionales = [];
let productosSeco = [];

// Pide los productos de una categoria al backend
async function traerProductos(categoria) {
    const respuesta = await fetch (`${API_URL}/api/productos?categoria=${categoria}`)

    if (!respuesta.ok){
        throw new Error (`El servidor respondio con estado ${respuesta.status}`);
    }

    return await respuesta.json();
}

// Carga una categoria y la muestra en pantalla
async function cargarCatalogo(categoria) {
    const contenedor = document.getElementById("catalogo");

    try {
        contenedor.innerHTML = "<p>Cargando productos...</p>";

        const productos = await traerProductos(categoria);

        // Guardamos en la variable global que usa agregarAlCarrito()
        if (categoria === "tradicional") {
            productosTradicionales = productos;
        } else {
            productosSeco = productos;
        }

        mostrarProductos(productos, categoria);

    } catch (error){
        console.error("Error al cargar productos:", error);
        contenedor.innerHTML = `
        <p style="color:#c0392b">
            No se pudieron cargar los productos.
            Verifica que el servidor este encendido.
        </p>`;
    }   
}
