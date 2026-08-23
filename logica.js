// ===============================
// Mostrar productos dinámicamente
// ===============================
function mostrarProductos(lista, origen) {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("article");
        card.className = "producto";

        card.innerHTML = `
        <figure>
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <figcaption>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio} ${producto.unidad}</p>
                <button onclick="agregarAlCarrito(${producto.id}, '${origen}')">Agregar al carrito</button>
            </figcaption>
        </figure>
        `;
        contenedor.appendChild(card);
    });
}

// ===============================
// Toast moderno (login y carrito)
// ===============================
function mostrarToast(mensaje, tipo = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100); // animar entrada
    setTimeout(() => {
        toast.classList.remove("show");
        document.body.removeChild(toast);
    }, 3000); // desaparece en 3 segundos
}

// ===============================
// Agregar producto al carrito
// ===============================
function agregarAlCarrito(idProducto, origen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let catalogo = origen === "tradicional" ? productosTradicionales : productosSeco;
    let productoBase = catalogo.find(p => p.id === idProducto);

    if (!productoBase) {
        mostrarToast("Producto no encontrado", "error");
        return;
    }

    let index = carrito.findIndex(item => item.id === idProducto && item.origen === origen);

    if (index >= 0) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({
            id: productoBase.id,
            nombre: productoBase.nombre,
            descripcion: productoBase.descripcion,
            precio: productoBase.precio,
            unidad: productoBase.unidad,
            imagen: productoBase.imagen,
            cantidad: 1,
            origen: origen
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Toast moderno en lugar de alert
    mostrarToast(`Producto "${productoBase.nombre}" agregado al carrito`, "success");
}

// ===============================
// Mostrar carrito
// ===============================
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const card = document.createElement("div");
        card.className = "card-carrito";

        card.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-imagen" />
            <div class="carrito-info">
                <h3>${item.nombre}</h3>
                <p>${item.descripcion || ""}</p>
                <p><strong>Unidad:</strong> ${item.unidad}</p>
                <p><strong>Precio:</strong> $${item.precio}</p>
                <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                <p><strong>Subtotal:</strong> $${subtotal}</p>

                <div class="carrito-acciones">
                    <button onclick="incrementarCantidad(${index})">+</button>
                    <button onclick="decrementarCantidad(${index})">-</button>
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    const totalEl = document.createElement("div");
    totalEl.className = "carrito-total";
    totalEl.innerHTML = `<h4>Total: $${total}</h4>`;
    contenedor.appendChild(totalEl);
}

// ===============================
// Modificar cantidades del carrito
// ===============================
function incrementarCantidad(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function decrementarCantidad(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad = Math.max(1, carrito[index].cantidad - 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// ===============================
// Vaciar carrito y finalizar compra
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const btnVaciar = document.getElementById("btn-vaciar");
    const btnFinalizar = document.getElementById("btn-finalizar");

    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            mostrarCarrito();
            mostrarToast("Carrito vaciado", "error");
        });
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            mostrarToast("¡Gracias por tu compra!", "success");
            localStorage.removeItem("carrito");
            mostrarCarrito();
        });
    }
});


// "async" indica que la función hace tareas que tardan (esperar al servidor).
// Solo dentro de una función async se puede usar "await".
async function loginUsuario(event) {
    // Evita que el formulario recargue la página al enviarse
    event.preventDefault();

    // Capturamos los valores que escribió el usuario.
    // .trim() borra espacios en blanco al principio y al final
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validación mínima del lado del cliente: que no estén vacíos.
    // Las reglas de seguridad reales las valida el backend.
    if (!email || !password) {
        mostrarToast("Completá todos los campos.", "error");
        return; // corta la función acá, no sigue
    }

    // try/catch: si el servidor está apagado o falla la red,
    // el error se captura abajo en vez de romper la página
    try {
        // fetch() envía la petición HTTP al backend.
        // "await" pausa la función hasta que llegue la respuesta.
        const respuesta = await fetch(`${API_URL}/api/auth/login`, {
            // POST porque enviamos datos sensibles en el cuerpo, no en la URL
            method: "POST",

            // Le avisamos al servidor que le mandamos JSON
            headers: { "Content-Type": "application/json" },

            // JSON.stringify convierte el objeto JavaScript en texto JSON.
            // { email, password } es atajo de { email: email, password: password }
            body: JSON.stringify({ email, password })
        });

        // respuesta.ok es true si el código HTTP es 200-299.
        // Si el backend devolvió 401 (credenciales inválidas), entra acá.
        if (!respuesta.ok) {
            // Leemos el JSON del error para mostrar el mensaje que mandó la API
            const error = await respuesta.json();
            // error.detail es el texto del HTTPException del backend.
            // El "||" pone un mensaje por defecto si viniera vacío
            mostrarToast(error.detail || "Email o contraseña incorrectos", "error");
            return;
        }

        // Si llegamos acá, el login fue exitoso.
        // .json() convierte la respuesta de texto a objeto JavaScript
        const datos = await respuesta.json();

        // Guardamos el token en localStorage.
        // localStorage PERSISTE al navegar entre páginas y al cerrar el navegador,
        // a diferencia de sessionStorage. Esto resuelve la sesión que se perdía.
        localStorage.setItem("token", datos.access_token);

        // Guardamos también el nombre, solo para mostrarlo en pantalla
        localStorage.setItem("usuarioLogueado", datos.usuario.nombre);

        mostrarToast(`Bienvenido ${datos.usuario.nombre}. Redirigiendo...`, "success");

        // Esperamos 1 segundo para que el usuario alcance a leer el toast,
        // y recién ahí redirigimos al carrito
        setTimeout(() => {
            window.location.href = "carrito.html";
        }, 1000);

    } catch (error) {
        // Este catch se activa si el servidor no responde (apagado, sin red).
        // Los detalles técnicos van a la consola, no a la cara del usuario
        console.error("Error de conexión:", error);
        mostrarToast("No se pudo conectar con el servidor.", "error");
    }
}

// Finalizar compra y mostrar mensaje.
function finalizarCompra(event) {
    event.preventDefault();

    const direccion = document.getElementById("direccion").value.trim();
    const entreCalles = document.getElementById("entreCalles").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();

    if (!direccion || !entreCalles || !ciudad) {
        mostrarToast("Por favor completá todos los campos de envío.", "error");
        return;
}

    mostrarToast("¡Gracias por tu compra! En breve recibirás la confirmación.", "success");

  // Si querés, podés vaciar el carrito acá
  // carrito = [];
  // actualizarCarrito();
}


// ===============================
// Registro de usuario nuevo
// ===============================

// async porque espera la respuesta del servidor al crear la cuenta
async function registrarUsuario(event) {
    // Evita que el formulario recargue la página al enviarse
    event.preventDefault();

    // Capturamos los tres campos del formulario de registro.
    // Los id llevan el prefijo "reg-" para no chocar con los del login,
    // que están en la misma página (email y password ya existen arriba)
    const nombre = document.getElementById("reg-nombre").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Validación: ningún campo vacío
    if (!nombre || !email || !password) {
        mostrarToast("Completá todos los campos.", "error");
        return; // corta la función, no envía nada al servidor
    }

    // Validación de longitud mínima.
    // Es una comodidad para el usuario (aviso inmediato, sin esperar al servidor),
    // pero NO es seguridad: cualquiera puede saltearla desde la consola.
    // La validación que cuenta siempre es la del backend.
    if (password.length < 6) {
        mostrarToast("La contraseña debe tener al menos 6 caracteres.", "error");
        return;
    }

    // try/catch para capturar fallos de red o servidor apagado
    try {
        // Enviamos los datos al endpoint de registro.
        // Misma estructura que el login: method, headers y body
        const respuesta = await fetch(`${API_URL}/api/auth/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Los tres campos deben coincidir EXACTO con el schema
            // UsuarioRegistro del backend (nombre, email, password)
            body: JSON.stringify({ nombre, email, password })
        });

        // Si el backend devolvió un error (por ejemplo 400 "Ese email ya
        // está registrado", o 422 si el JSON no cumple el schema)
        if (!respuesta.ok) {
            const error = await respuesta.json();
            mostrarToast(error.detail || "No se pudo registrar", "error");
            return;
        }

        // Registro exitoso.
        // Ojo: acá NO guardamos ningún token, porque el endpoint de registro
        // no devuelve uno — solo crea la cuenta. El usuario tiene que
        // iniciar sesión después para obtener su JWT.
        mostrarToast("Cuenta creada. Ya podés iniciar sesión.", "success");

        // .reset() limpia todos los campos del formulario,
        // así queda listo por si quiere registrar otra cuenta
        document.getElementById("form-registro").reset();

    } catch (error) {
        // Fallo de conexión: servidor caído o sin red
        console.error("Error de conexión:", error);
        mostrarToast("No se pudo conectar con el servidor.", "error");
    }
}

// ===============================
// Manejo de sesión (JWT)
// ===============================

// Devuelve el token guardado, o null si no hay ninguno.
// Es un atajo para no repetir localStorage.getItem("token") por todos lados
function obtenerToken() {
    return localStorage.getItem("token");
}

// Devuelve true si hay un token guardado.
// OJO: esto solo verifica que EXISTA un token, no que sea válido.
// La validación real la hace el backend cuando recibe el token.
// Acá es solo para decidir qué mostrar en pantalla.
function estaLogueado() {
    return obtenerToken() !== null;
}

// Cierra la sesión: borra el token y los datos del usuario
function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogueado");

    mostrarToast("Sesión cerrada", "success");

    // Redirige al login después de 1 segundo
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

// Protege una página: si no hay sesión, redirige al login.
// Se llama al principio de las páginas que requieren estar logueado.
function protegerPagina() {
    if (!estaLogueado()) {
        mostrarToast("Necesitás iniciar sesión para continuar", "error");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

        return false; // avisa que NO está logueado
    }
    return true; // está logueado, puede seguir
}

// ===============================
// Barra de usuario en el carrito
// ===============================

// Dibuja un saludo con el nombre del usuario y un botón para cerrar sesión.
// Recibe el id del contenedor donde insertarlo
function mostrarBarraUsuario(idContenedor) {
    const contenedor = document.getElementById(idContenedor);

    // Si el contenedor no existe en esta página, no hacemos nada
    if (!contenedor) return;

    // Leemos el nombre que guardamos al hacer login
    const nombre = localStorage.getItem("usuarioLogueado");

    if (!nombre) return;

    // Insertamos el saludo y el botón de salir
    contenedor.innerHTML = `
        <div class="barra-usuario">
            <span>Hola, <strong>${nombre}</strong></span>
            <button onclick="cerrarSesion()">Cerrar sesión</button>
        </div>
    `;
}